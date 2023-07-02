import React, {useEffect, useState} from 'react';
import styles from './style.module.css';
import {useLocation} from 'react-router-dom';
import {servicesDoctor} from "../../untils/mock";
import {
    doc,
    getFirestore,
    updateDoc,
    arrayUnion,
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc
} from "firebase/firestore";
import {app} from "../../config/firebase";
import {getAuth} from "firebase/auth";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {onAuthStateChanged} from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const Payment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const doctorName = searchParams.get('doctor');
    const doctor = servicesDoctor.find((doc) => doc.doc1 === doctorName || doc.doc2 === doctorName || doc.doc3 === doctorName || doc.doc4 === doctorName || doc.doc5 === doctorName || doc.doc7 === doctorName);
    const [selectedService, setSelectedService] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [receiptFile, setReceiptFile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleFileChange = (e) => {
        setReceiptFile(e.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payerName = event.target.payerName.value;
        const payerEmail = currentUser.email;
        const payerPhone = event.target.payerPhone.value;

        if (!receiptFile) {
            alert("Please select a receipt file before submitting");
            return;
        }

        setIsUploading(true);

        const uploadTask = uploadBytesResumable(ref(storage, `receipts/${currentUser.uid}_${new Date().toISOString()}`), receiptFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                setIsUploading(false);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                        setIsUploading(false);

                        const paymentData = {
                            payerName,
                            payerEmail,
                            payerPhone,
                            doctorName,
                            paymentStatus: "В обработке",
                            receiptURL: downloadURL,
                            uid: currentUser.uid,
                        };

                        const paymentDocRef = doc(db, "payments", currentUser.uid);
                        const paymentDocSnap = await getDoc(paymentDocRef);

                        if (paymentDocSnap.exists()) {
                            try {
                                await updateDoc(paymentDocRef, paymentData);
                                setPaymentStatus("В обработке");
                            } catch (error) {
                                console.error("Error updating document: ", error);
                            }
                        } else {
                            try {
                                await setDoc(paymentDocRef, paymentData);
                                setPaymentStatus("В обработке");
                            } catch (error) {
                                console.error("Error creating document: ", error);
                            }
                        }
                    })
                    .catch((error) => {
                        setIsUploading(false);
                        alert("Error getting download URL. Please try again.");
                        console.error("Error getting download URL:", error);
                    });
            }
        );
    };


    const onKeyPressHandler = (e) => {
        // Проверяем, является ли введенный символ цифрой
        if (e.charCode >= 48 && e.charCode <= 57) {
            e.preventDefault();
        }
    };
    const onInputHandler = (e, n) => {
        // Ограничить длину вводимого значения до 20 символов
        if (e.target.value.length > n) {
            e.target.value = e.target.value.slice(0, n);
        }
    };
    return (
        <div>
            {paymentStatus === 'В обработке' ? (
                <div className={styles.paymentSuccess}>
                    <h3>Оплата успешно выполнена!</h3>
                </div>
            ) : (
                <div className={styles.formPayment}>
                    <div className={styles.formPayment}>
                        <h3>
                            ОПЛАТА<span> УСЛУГ</span>
                        </h3>
                        <h4>Выбранный врач: {doctorName}</h4>
                        <form onSubmit={handleSubmit}>
                            <input name="payerName" type="text" placeholder="ФИО" maxLength={50}
                                   onKeyPress={onKeyPressHandler} required className={styles.input}/>
                            <input name="payerEmail" type="email" maxLength={50} required placeholder="Email"
                                   value={currentUser ? currentUser.email : ''} disabled className={styles.input}/>
                            <input name="payerPhone" type="number" onInput={(e) => onInputHandler(e, 11)} required
                                   placeholder="Телефон" className={styles.input}/>
                            <div className={styles.paymentAmount}>
                                <select name="serviceSelection" value={selectedService} onChange={handleServiceChange}
                                        required>
                                    <option value="">Выберите услугу</option>
                                    {doctor.services.map((service, index) => (
                                        <option key={index} value=
                                            {
                                                `${service.service1}, ${service.price1},
                                    ${service.service2},${service.price2},
                                    ${service.service3},${service.price3},
                                    ${service.service4},${service.price4},
                                    ${service.service5},${service.price5},
                                    ${service.service6},${service.price6},
                                    ${service.service7},${service.price7}`
                                            }>
                                            {service.service1} {service.price1}
                                            {service.service2} {service.price2}
                                            {service.service3} {service.price3}
                                            {service.service4} {service.price4}
                                            {service.service5} {service.price5}
                                            {service.service6} {service.price6}
                                            {service.service7} {service.price7}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className={styles.bankDetails}>
                                    <h5>Реквизиты для оплаты:</h5>
                                    <p>
                                        Наименование: Клинико-Диагностический центр<br/>
                                        Банк: Great Bank<br/>
                                        Номер карты для перевода: 5168 3232 4421 4214<br/>
                                    </p>
                                    <h5>Инструкции для оплаты:</h5>
                                    <p>
                                        1. Откройте приложение вашего банка.<br/>
                                        2. Выберите опцию для перевода денег.<br/>
                                        3. Введите предоставленные банковские реквизиты.<br/>
                                        4. После завершения платежа сохраните чек об оплате.<br/>
                                        5. В поле коментарий для перевода укажите "Оплата услуг врача {doctorName}"<br/>
                                        6. Загрузите чек об оплате с помощью формы ниже.<br/>
                                    </p>
                                    <p>
                                        Если у вас возникли какие-либо проблемы свяжитесь со службой поддержки
                                    </p>
                                </div>
                                <input type="file" accept="image/*" onChange={handleFileChange} required
                                       className={styles.input}/>
                            </div>

                            {isUploading && <p>Progress: {progress}%</p>}

                            <button type="submit" className={styles.button}>
                                Я ПРОИЗВЕЛ ПЕРЕВОД
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
