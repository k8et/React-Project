import React, {useEffect, useState} from "react";
import {getAuth, signOut, updateEmail, updatePassword} from "firebase/auth";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import {app} from "../../config/firebase";
import {useNavigate} from "react-router-dom";
import {Typography, TextField, Button, Tab, Tabs, Box} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import styles from "./style.module.css";

const db = getFirestore(app);
const appointmentsCollection = collection(db, "appointments");

const Profile = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("appointments");
    const [payment, setPayment] = useState([]);
    const [deletedAppointmentId, setDeletedAppointmentId] = useState(null);
    console.log(payment)
    useEffect(() => {
        fetchPaymentData();
    }, []);
    const fetchPaymentData = async () => {
        const auth = getAuth(app);
        const user = auth.currentUser;
        const paymentsRef = collection(db, "payments");
        const paymentQuery = query(paymentsRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(paymentQuery);
        const paymentData = [];
        querySnapshot.forEach((doc) => {
            const payment = {
                id: doc.id,
                ...doc.data(),
            };
            paymentData.push(payment);
        });
        setPayment(paymentData);
    };
    const navigate = useNavigate();
    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        navigate("/");
    };
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/login");
            } else {
                const db = getFirestore(app);
                const q = query(appointmentsCollection, where("uid", "==", user.uid));
                getDocs(q)
                    .then((querySnapshot) => {
                        const appointments = [];
                        querySnapshot.forEach((doc) => {
                            const data = doc.data();
                            appointments.push({...data, id: doc.id});
                        });
                        setAppointments(appointments);
                    })
                    .catch((error) => {
                        console.error("Ошибка получения записей пользователя:", error);
                    });
                const paymentsCollection = collection(db, "payments");
                const paymentQuery = query(paymentsCollection, where("uid", "==", user.uid));
                const paymentUnsubscribe = onSnapshot(paymentQuery, (querySnapshot) => {
                    querySnapshot.forEach((paymentDoc) => {
                        const paymentData = paymentDoc.data();
                        if (paymentData.uid === user.uid) {
                            getDocs(q)
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((appointmentDoc) => {
                                        if (appointmentDoc.data().uid === user.uid) {
                                            const appointmentRef = doc(db, "appointments", appointmentDoc.id);
                                            updateDoc(appointmentRef, {status: "оплачено"});
                                        }
                                    });
                                })
                                .catch((error) => {
                                    console.error("Ошибка обновления статуса записи:", error);
                                });
                        }
                    });
                });
                return () => {
                    paymentUnsubscribe();
                };
            }
        });
        return () => {
            unsubscribe();
        };
    }, [navigate, deletedAppointmentId]);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const handleEmailUpdate = async () => {
        try {
            await updateEmail(user, email);
            setEmail("");
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };
    const handlePasswordUpdate = async () => {
        try {
            await updatePassword(user, password);
            setPassword("");
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };
    const handleDelete = async (appointmentId) => {
        try {
            const appointmentRef = doc(db, "appointments", appointmentId);
            await deleteDoc(appointmentRef);
            setDeletedAppointmentId(appointmentId);
        } catch (error) {
            console.error("Ошибка удаления записи:", error);
        }
    };
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Button startIcon={<ArrowBack/>} variant={"outlined"} onClick={handleBack}>Назад</Button>
                <Typography variant="h2">Профиль</Typography>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab label="Настройки" value="documents"/>
                    <Tab label="Мои записи" value="appointments"/>
                </Tabs>
                {activeTab === "documents" ? (
                    <Box p={3}>
                        <div className={styles.emailInput}>
                            <Typography variant="h3">Обновить почту</Typography>
                            <TextField type="email" label="Новая почта" placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button variant="contained" onClick={handleEmailUpdate}>
                                Обновить
                            </Button>
                        </div>
                        <div className={styles.passwordInput}>
                            <Typography variant="h3">Обновить пароль</Typography>
                            <TextField type="password" label="Новый пароль" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="contained" onClick={handlePasswordUpdate}>
                                Обновить
                            </Button>
                        </div>
                    </Box>
                ) : (
                    <Box p={3}>
                        <Typography variant="h3">Мои записи</Typography>
                        {appointments.map((appointment, index) => (
                            <div key={index} className={styles.appointment}>
                                <Typography variant="p">Врач: {appointment.doctor}</Typography>
                                <Typography variant="p">Дата и время: {appointment.data.toDate().toLocaleString()}</Typography>
                                <Typography variant="p">Отделение: {appointment.department}</Typography>
                                <Typography variant="p">Статус: {payment[index]?.paymentStatus}</Typography>
                                <Button variant="outlined" onClick={() => handleDelete(appointment.id)}>Удалить</Button>
                            </div>
                        ))}
                    </Box>
                )}
                <Button onClick={handleLogout} variant="contained" style={{marginTop: "1rem"}}>Выйти</Button>
                {error && <Typography className={styles.errorMessage}>{error}</Typography>}
            </div>
        </div>
    );
};

export default Profile;
