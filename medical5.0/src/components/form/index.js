import React, {useState} from 'react';
import styles from './style.module.css';
import {getFirestore, collection, addDoc, query, getDocs, where} from "firebase/firestore";
import {app} from "../../config/firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Timestamp } from "firebase/firestore";



const db = getFirestore(app);
const auth = getAuth(app);
const appointmentsCollection = collection(db, "appointments");


const Form = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [formSubmitMessage, setFormSubmitMessage] = useState("")
    const [formSubmitError, setFormSubmitError] = useState("")
    const [formTelEr, setFormTelEr] = useState("")
    const [selectedDate, setSelectedDate] = useState(null);
    const [isFormValid, setIsFormValid] = useState(true);

    const navigate = useNavigate()

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        if (event.target.value === "стоматология") {
            setDoctors([
                "Хисамиев Ильдар Гамилевич",
                "Зайдуллин Дамир Галимуллович",
                "Закиров Ленар Габдельбарович",
                "Николаев Сергей Викторович",
            ]);
        } else if (event.target.value === "поликлиника") {
            setDoctors([
                "Шакиров Мансур Исхакович",
                "Валеева Кадрия Гусмановна",
                "Мухина Равия Гаязовна",
                "Хайруллин Наиль Талгатович",
                "Назипова Альфия Якуповна",
                "Габасов Марсель Винерович",
                "Мардамшин Альфред Загитович",
                "Шурмин Дмитрий Юрьевич",
            ]);
        } else if (event.target.value === "диагностика") {
            setDoctors([
                "Курбанова Алсу Ахметовна",
                "Гимадиева Лилия Фаридовна",
                "Ахметова Дина Камилевна",
                "Габасов Марсель Винерович",
            ]);
        } else {
            setDoctors([]);
        }
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const checkAppointmentAvailability = async (selectedDate, doctor) => {
        const q = query(
            appointmentsCollection,
            where("doctor", "==", doctor),
            where("data", "==", Timestamp.fromDate(selectedDate))
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.empty;
    };
    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) {
            setFormTelEr("Номер телефона некорректен, форма не отправлена");
            return;
        }
        const user = auth.currentUser;
        if (!user) {
            console.log("Пользователь не аутентифицирован, форма не отправлена");
            navigate("/singUp");
            return;
        }
        const form = event.target;
        const name = form.elements.nameForm.value;
        const number = form.elements.numberForm.value;
        const birthday = form.elements.birthday.value;
        const department = form.elements.department.value;
        const doctor = form.elements.doctor.value;

        const isAvailable = await checkAppointmentAvailability(selectedDate, doctor);
        if (!isAvailable) {
            setFormSubmitError("Выбранное время уже занято. Пожалуйста, выберите другое время.");
            return;
        }

        await submitForm(name, number, department, doctor, birthday);
        form.reset();
        setSelectedDepartment("");
        setSelectedDoctor("");
        navigate(`/payment?doctor=${doctor}`);
    };


    const submitForm = async (name, number, department, doctor, birthday) => {
        try {
            const timestampSelectedDate = Timestamp.fromDate(selectedDate);

            const user = auth.currentUser;
            const uid = user.uid;

            const newDocRef = await addDoc(appointmentsCollection, {
                name: name,
                number: number,
                data: timestampSelectedDate,
                department: department,
                doctor: doctor,
                birthday: birthday,
                uid: uid, // Добавить UID пользователя в документ
                status: "в обработке"
            });
            console.log("Ваша заявка успешно отправлена!");
            console.log("ID документа:", newDocRef.id); // вывести идентификатор нового документа
            setFormSubmitMessage("Ваша заявка успешно отправлена!")
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
            setFormSubmitError("Ошибка отправки формы: " + error.message)
        }
    };





    const availableHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return selectedDate.getTime() > currentDate.getTime();
    };

    const filterAvailableHours = (time) => {
        const hour = time.getHours();
        return availableHours.includes(hour);
    };
    const onBlurHandler = (e) => {
        // Регулярное выражение для проверки российского номера телефона
        const phoneNumberRegex = /^((\+7|7|8)+([0-9]){10})$/;

        // Проверка соответствия введенного номера регулярному выражению
        setIsFormValid(phoneNumberRegex.test(e.target.value));
    };

    const onKeyPressHandler = (e) => {
        // Проверяем, является ли введенный символ цифрой
        if (e.charCode >= 48 && e.charCode <= 57){
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
            <form onSubmit={handleSubmit}>
                <input name="nameForm" type="text" placeholder="ФИО" maxLength={50} onKeyPress={onKeyPressHandler} required className={styles.input}/>
                <input
                    name="numberForm"
                    type="number"
                    onInput={(e)=>onInputHandler(e,11)}
                    required
                    placeholder="Телефон"
                    className={styles.input}
                    onBlur={onBlurHandler}
                />
                <div  className={styles.dataPiker}>
                    <label> Дата приема: </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        dateFormat="yyyy-MM-dd HH:mm"
                        timeCaption="время"
                        minDate={new Date()}
                        filterDate={filterPassedTime}
                        filterTime={filterAvailableHours}
                        required
                    />
                </div>
                <div className={styles.birthday}><label>Дата рождения:</label><input name='birthday' type="date" max={new Date().toISOString().split("T")[0]}  required/></div>
                <select name="department" onChange={handleDepartmentChange} required >
                    <option value="">Отделение</option>
                    <option value="стоматология">Стоматология</option>
                    <option value="диагностика">Диагностика</option>
                    <option value="поликлиника">Поликлиника</option>
                </select>
                {selectedDepartment === "стоматология" && (
                    <select name="doctor" value={selectedDoctor} onChange={handleDoctorChange} required>
                        <option value="">Выбор врача</option>
                        {doctors.map((doctor) => (
                            <option key={doctor} value={doctor}>
                                {doctor}
                            </option>
                        ))}
                    </select>
                )}
                {selectedDepartment === "диагностика" && (
                    <select name="doctor" value={selectedDoctor} onChange={handleDoctorChange} required>
                        <option value="">Выбор врача</option>
                        {doctors.map((doctor) => (
                            <option key={doctor} value={doctor}>
                                {doctor}
                            </option>
                        ))}
                    </select>
                )}
                {selectedDepartment === "поликлиника" && (
                    <select name="doctor" value={selectedDoctor} onChange={handleDoctorChange} required>
                        <option value="">Выбор врача</option>
                        {doctors.map((doctor) => (
                            <option key={doctor} value={doctor}>
                                {doctor}
                            </option>
                        ))}
                    </select>
                )}
                <button type="submit" className={styles.button}>
                    ОТПРАВИТЬ
                </button>
                <p>{formSubmitMessage || formSubmitError || formTelEr}</p>
            </form>
        </div>
    );
};

export default Form;