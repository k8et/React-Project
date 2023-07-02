import React, {useEffect, useState} from 'react';
import {
    getFirestore,
    collection,
    query,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc,
    addDoc
} from 'firebase/firestore';
import {app} from '../../config/firebase';
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import * as XLSX from 'xlsx';
import styles from "./style.module.css";
import AdminSupportChat from "../../components/adminSupChat";
import PaymentTable from "../../components/paymentTable";


const db = getFirestore(app);
const appointmentsCollection = collection(db, 'appointments');

const AdminPanel = () => {
    const [appointments, setAppointments] = useState([]);
    const [docs, setDocs] = useState([]);
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({department: 'clinic', serviceName: '', price: ''});
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        exp: '',
        category: '',
        img: ''
    });
    const navigate = useNavigate();
    const docCollection = collection(db, 'doc');
    const [clinicServices, setClinicServices] = useState([]);
    const [diagnosticsServices, setDiagnosticsServices] = useState([]);
    const [dentistryServices, setDentistryServices] = useState([]);

    useEffect(() => {
        const serviceCollection = collection(db, 'services', 'departments', 'clinic');
        const q = query(serviceCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setClinicServices(data);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const serviceCollection = collection(db, 'services', 'departments', 'diagnostics');
        const q = query(serviceCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setDiagnosticsServices(data);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const serviceCollection = collection(db, 'services', 'departments', 'dentistry');
        const q = query(serviceCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setDentistryServices(data);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        const servicesRef = collection(db, 'service');
        const q = query(servicesRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setServices(data);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const q = query(docCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setDocs(data);
        });
        return () => unsubscribe();
    }, []);
    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        navigate("/");
    };

    useEffect(() => {
        const q = query(appointmentsCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setAppointments(data);
        });
        return () => unsubscribe();
    }, []);

    const handleDateChange = async (id, date) => {
        try {
            await updateDoc(doc(appointmentsCollection, id), {data: date});
            console.log('Дата записи изменена успешно');
        } catch (error) {
            console.error('Ошибка при изменении даты записи:', error);
        }
    };

    const handleNameChange = async (id, name) => {
        try {
            await updateDoc(doc(appointmentsCollection, id), {name});
            console.log('Имя пациента изменено успешно');
        } catch (error) {
            console.error('Ошибка при изменении имени пациента:', error);
        }
    };

    const handleDoctorChange = async (id, doctor) => {
        try {
            await updateDoc(doc(appointmentsCollection, id), {doctor});
            console.log('Врач изменен успешно');
        } catch (error) {
            console.error('Ошибка при изменении врача:', error);
        }
    };

    const handleDepartmentChange = async (id, department) => {
        try {
            await updateDoc(doc(appointmentsCollection, id), {department});
            console.log('Отделение изменено успешно');
        } catch (error) {
            console.error('Ошибка при изменении отделения:', error);
        }
    };

    const handleNumberChange = async (id, number) => {
        try {
            await updateDoc(doc(appointmentsCollection, id), {number});
            console.log('Номер телефона изменен успешно');
        } catch (error) {
            console.error('Ошибка при изменении номера телефона:', error);
        }
    };
    const handleBirthDateChange = async (id, birthday) => {
        try {
            await updateDoc(doc(appointmentsCollection, id), {birthday});
            console.log('Дата рождения изменена успешно');
        } catch (error) {
            console.error('Ошибка при изменении даты рождения:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(appointmentsCollection, id));
            console.log('Запись удалена успешно');
        } catch (error) {
            console.error('Ошибка при удалении записи:', error);
        }
    };
    const handleAddDoctor = async () => {
        try {
            await addDoc(docCollection, newDoctor);
            console.log('Врач успешно добавлен');
            setNewDoctor({name: '', exp: '', category: '', img: ''});
        } catch (error) {
            console.error('Ошибка при добавлении врача:', error);
        }
    };
    const handleDoctorNameChange = async (id, name) => {
        try {
            await updateDoc(doc(docCollection, id), {name});
            console.log('Имя врача изменено успешно');
        } catch (error) {
            console.error('Ошибка при изменении имени врача:', error);
        }
    };

    const handleDoctorExpChange = async (id, exp) => {
        try {
            await updateDoc(doc(docCollection, id), {exp});
            console.log('Стаж врача изменен успешно');
        } catch (error) {
            console.error('Ошибка при изменении стажа врача:', error);
        }
    };

    const handleDoctorCategoryChange = async (id, category) => {
        try {
            await updateDoc(doc(docCollection, id), {category});
            console.log('Категория врача изменена успешно');
        } catch (error) {
            console.error('Ошибка при изменении категории врача:', error);
        }
    };

    const handleDoctorImgChange = async (id, img) => {
        try {
            await updateDoc(doc(docCollection, id), {img});
            console.log('Изображение врача изменено успешно');
        } catch (error) {
            console.error('Ошибка при изменении изоброжения врача:', error);
        }
    };
    const handleDeleteDoctor = async (id) => {
        try {
            await deleteDoc(doc(docCollection, id));
            console.log('Врач удален успешно');
        } catch (error) {
            console.error('Ошибка при удалении врача:', error);
        }
    };
    const addService = async () => {
        try {
            const serviceCollection = collection(db, 'services', 'departments', newService.department);
            await addDoc(serviceCollection, {
                serviceName: newService.serviceName,
                price: parseFloat(newService.price),
            });
            console.log('Услуга добавлена успешно');
            setNewService({...newService, serviceName: '', price: ''});
        } catch (error) {
            console.error('Ошибка при добавлении услуги:', error);
        }
    };
    const handleDeleteService = async (department, id) => {
        try {
            const serviceDoc = doc(db, 'services', 'departments', department, id);
            await deleteDoc(serviceDoc);
            console.log('Услуга удалена успешно');
        } catch (error) {
            console.error('Ошибка при удалении услуги:', error);
        }
    };


    const exportToExcel = () => {
        const data = [
            ['Имя', 'Номер телефона', 'Дата приема', 'Дата рождения', 'Отделение', 'Врач'],
            ...appointments.map(appointment => [
                appointment.name,
                appointment.number,
                new Date((appointment.data?.seconds + (3 * 60 * 60)) * 1000).toISOString().substr(0, 16),
                appointment.birthday,
                appointment.department,
                appointment.doctor,
            ]),
        ];

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Appointments');
        XLSX.writeFile(wb, 'appointments.xlsx');
    };

    return (
        <div className={styles.main}>
            <AdminSupportChat></AdminSupportChat>
            <h1>Админ-панель</h1>
            <div>
                <h3>Запись на прием</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Номер телефона</th>
                        <th>Дата приема</th>
                        <th>Дата рождения</th>
                        <th>Отделение</th>
                        <th>Врач</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>
                                <input
                                    type="text"
                                    value={appointment.name}
                                    onChange={(e) => handleNameChange(appointment.id, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={appointment.number}
                                    onChange={(e) => handleNumberChange(appointment.id, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="datetime-local"
                                    value={new Date((appointment.data?.seconds + (3 * 60 * 60)) * 1000).toISOString().substr(0, 16)}
                                    onChange={(e) => handleDateChange(appointment.id, new Date(e.target.value))}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={appointment.birthday}
                                    onChange={(e) => handleBirthDateChange(appointment.id, e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={appointment.department}
                                    onChange={(e) => handleDepartmentChange(appointment.id, e.target.value)}
                                >
                                    <option value="стоматология">Стоматология</option>
                                    <option value="диагностика">Диагностика</option>
                                    <option value="поликлиника">Поликлиника</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    value={appointment.doctor}
                                    onChange={(e) => handleDoctorChange(appointment.id, e.target.value)}
                                >
                                    <option value="Хисамиев Ильдар Гамилевич">Хисамиев Ильдар Гамилевич</option>
                                    <option value="Зайдуллин Дамир Галимуллович">Зайдуллин Дамир Галимуллович</option>
                                    <option value="Закиров Ленар Габдельбарович">Закиров Ленар Габдельбарович</option>
                                    <option value="Николаев Сергей Викторович">Николаев Сергей Викторович</option>
                                    <option value="Шакиров Мансур Исхакович">Шакиров Мансур Исхакович</option>
                                    <option value="Валеева Кадрия Гусмановна">Валеева Кадрия Гусмановна</option>
                                    <option value="Мухина Равия Гаязовна">Мухина Равия Гаязовна</option>
                                    <option value="Хайруллин Наиль Талгатович">Хайруллин Наиль Талгатович</option>
                                    <option value="Назипова Альфия Якуповна">Назипова Альфия Якуповна</option>
                                    <option value="Габасов Марсель Винерович">Габасов Марсель Винерович</option>
                                    <option value="Мардамшин Альфред Загитович">Мардамшин Альфред Загитович</option>
                                    <option value="Шурмин Дмитрий Юрьевич">Шурмин Дмитрий Юрьевич</option>
                                    <option value="Курбанова Алсу Ахметовна">Курбанова Алсу Ахметовна</option>
                                    <option value="Гимадиева Лилия Фаридовна">Гимадиева Лилия Фаридовна</option>
                                    <option value="Ахметова Дина Камилевна">Ахметова Дина Камилевна</option>
                                    <option value="Мельников Евгений Анатольевич">Мельников Евгений Анатольевич</option>
                                    <option value="Габасов Марсель Винерович">Габасов Марсель Винерович</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(appointment.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={exportToExcel} className={styles.exportButton}>
                    Экспорт в Excel
                </button>
                <div>
                    <PaymentTable></PaymentTable>
                </div>
                <div>
                    <h3>Добавить врача</h3>
                    <input
                        type="text"
                        placeholder="Имя врача"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                    />
                    <input
                        type="number"
                        placeholder="Стаж"
                        value={newDoctor.exp}
                        onChange={(e) => setNewDoctor({...newDoctor, exp: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Категория"
                        value={newDoctor.category}
                        onChange={(e) => setNewDoctor({...newDoctor, category: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="URL изображения"
                        value={newDoctor.img}
                        onChange={(e) => setNewDoctor({...newDoctor, img: e.target.value})}
                    />
                    <button onClick={handleAddDoctor}>Добавить врача</button>
                </div>
                <div>
                    <h3>Список врачей</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Опыт</th>
                            <th>Категория</th>
                            <th>Изображение</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {docs.map((docItem, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={docItem.name}
                                        onChange={(e) => handleDoctorNameChange(docItem.id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={docItem.exp}
                                        onChange={(e) => handleDoctorExpChange(docItem.id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={docItem.category}
                                        onChange={(e) => handleDoctorCategoryChange(docItem.id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={docItem.img}
                                        onChange={(e) => handleDoctorImgChange(docItem.id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteDoctor(docItem.id)}>Удалить</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Добавление услуги</h3>
                    <select
                        value={newService.department}
                        onChange={(e) => setNewService({...newService, department: e.target.value})}
                    >
                        <option value="clinic">Поликлиника</option>
                        <option value="diagnostics">Диагностика</option>
                        <option value="dentistry">Стоматология</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Название услуги"
                        value={newService.serviceName}
                        onChange={(e) => setNewService({...newService, serviceName: e.target.value})}
                    />
                    <input
                        type="number"
                        placeholder="Цена услуги"
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: e.target.value})}
                    />
                    <button onClick={addService}>Добавить услугу</button>
                </div>
                <div>
                    <h3>Услуги отделений</h3>

                    <h4>Поликлиника</h4>
                    <table>
                        <thead>
                        <tr>
                            <th>Услуга</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clinicServices.map((service, index) => (
                            <tr key={index}>
                                <td>{service.serviceName}</td>
                                <td>{service.price} руб.</td>
                                <td>
                                    <button onClick={() => handleDeleteService('clinic', service.id)}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h4>Диагностика</h4>
                    <table>
                        <thead>
                        <tr>
                            <th>Услуга</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {diagnosticsServices.map((service) => (
                            <tr key={service.id}>
                                <td>{service.serviceName}</td>
                                <td>{service.price} руб.</td>
                                <td>
                                    <button onClick={() => handleDeleteService('diagnostics', service.id)}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h4>Стоматология</h4>
                    <table>
                        <thead>
                        <tr>
                            <th>Услуга</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dentistryServices.map((service) => (
                            <tr key={service.id}>
                                <td>{service.serviceName}</td>
                                <td>{service.price} руб.</td>
                                <td>
                                    <button onClick={() => handleDeleteService('dentistry', service.id)}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={handleLogout} className={styles.btnLog} style={{marginTop: "1rem"}}>
                    Выйти
                </button>
                <p>
                    Вернутся на <Link to={"/"}>главную страничку</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminPanel;