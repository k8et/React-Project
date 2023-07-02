import React, {useEffect, useState} from 'react';
import styles from "./style.module.css";
import {badWords, menuItems} from "../../untils/mock";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import {app} from "../../config/firebase";
import {getAuth} from "firebase/auth";
const auth = getAuth();




const db = getFirestore(app);
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isFormValid, setIsFormValid] = useState(true);
    const [formTelEr, setFormTelEr] = useState("")
    const [formEr, setFormEr] = useState("")
    const hasBadWords = (form) => {
        const values = Object.values(form).map((input) => input.value);
        const text = values.join(" ");
        const regex = new RegExp(badWords.join("|"), "gi");
        return regex.test(text);
    };


    const submitForm = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            setFormTelEr("Номер телефона некорректен, форма не отправлена");
            return;
        }
        if (hasBadWords(e.target)) {
            alert("Обнаружены матерные слова, пожалуйста, исправьте текст.");
            return;
        }
        const department = e.target[1].value;
        const name = e.target[0].value;
        const phoneNumber = e.target[2].value;
        const email = e.target[3].value;
        const reviewText = e.target[4].value;
        const user = auth.currentUser;
        const userId = user.uid;
        try {
            await addDoc(collection(db, "reviews"), {
                userId,
                department,
                name,
                phoneNumber,
                email,
                reviewText,
                timestamp: new Date()
            });
            e.target.reset();
            setFormEr('Форма отправлена')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        const db = getFirestore(app);
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(docs);
        });

        return () => unsubscribe();
    }, []);
    const onKeyPressHandler = (e) => {
        // Проверяем, является ли введенный символ цифрой
        if (e.charCode >= 48 && e.charCode <= 57){
            e.preventDefault();
        }
    };
    const onBlurHandler = (e) => {
        // Регулярное выражение для проверки российского номера телефона
        const phoneNumberRegex = /^((\+7|7|8)+([0-9]){10})$/;

        // Проверка соответствия введенного номера регулярному выражению
        setIsFormValid(phoneNumberRegex.test(e.target.value));
    };
    const onInputHandler = (e, n) => {
        // Ограничить длину вводимого значения до 20 символов
        if (e.target.value.length > n) {
            e.target.value = e.target.value.slice(0, n);
        }
    };
    return (
        <div className={styles.main}>
            <div className={styles.reviews}>
                <h3 className={styles.textReview}>Отзывы</h3>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <h3>{review.name}</h3>
                        <p>{review.reviewText}</p>
                        <p>отделение: {review.department}</p>
                    </div>
                ))}
            </div>

            <div className={styles.formPos} onSubmit={submitForm}>
                <div className={styles.formReviews}>
                    <h3>ОСТАВИТЬ ОТЗЫВ</h3>
                    <form className={styles.form} action="">
                        <div className={styles.textSelect}>
                            <input type="text" placeholder={'Имя'} maxLength={20} required onKeyPress={onKeyPressHandler} />
                            <select name="" id="">
                                <option value="">Отделение</option>
                                {menuItems.map((menu) => (
                                    menu.items.map((item, index) => (
                                        <option key={index} value={item.label}>
                                            {item.label}
                                        </option>
                                    ))
                                ))}
                            </select>
                        </div>
                        <div className={styles.numberEmail}>
                            <input type="number" id="phone" name="phone"
                                   onInput={(e)=>onInputHandler(e,11)}
                                   required
                                   placeholder="Телефон"
                                   onBlur={onBlurHandler}
                            />
                            <input type="email" placeholder={'Почта'} maxLength={50} required />
                        </div>
                        <div className={styles.text}>
                 <textarea
                     placeholder={"Напишите ваше сообщение здесь"}
                     maxLength={500}
                     required
                 />
                        </div>
                        <p>Ваши персональные данные не будут опубликованы на сайте</p>
                        <button type={"submit"}>ОТПРАВИТЬ</button>
                        <p>{formTelEr || formEr}</p>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Reviews;