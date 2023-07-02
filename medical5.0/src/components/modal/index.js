import Modal from "react-modal";
import styles from './style.module.css';
import {useState} from "react";

const ModalComponent = ({ isModalOpen, toggleModal }) => {
    const [isFormValid, setIsFormValid] = useState(true);
    const [formTelEr, setFormTelEr] = useState("")
    const sendMessageToTelegram = async (message) => {
        const url = `https://api.telegram.org/bot5620654220:AAGh56BUANf0iDSf541ewEEzIGa7f72RriA/sendMessage`;

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: -828481123,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) {
            setFormTelEr("Номер телефона некорректен, форма не отправлена");
            return;
        }
        const name = event.target.elements.name.value;
        const phone = event.target.elements.phone.value;

        const message = `*Обратный звонок:*\nИмя: ${name}\nТелефон: ${phone}`;

        await sendMessageToTelegram(message);
        toggleModal();
    };
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
        <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel="Записаться на прием" className={styles.modal}>
            <button className={styles.reactModalClose} onClick={toggleModal}>×</button>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Обратный звонок</h2>
                    <div>
                        <input type="text" id="name" name="name" maxLength={50} onKeyPress={onKeyPressHandler} required placeholder='Имя' />
                    </div>
                    <div>
                        <input type="number" id="phone" name="phone"
                               onInput={(e)=>onInputHandler(e,11)}
                               required
                               placeholder="Телефон"
                               onBlur={onBlurHandler}
                        />
                    </div>
                    <button className={styles.submit} type="submit">Отправить</button>
                    <p>{formTelEr}</p>
                </form>
            </div>
        </Modal>
    );
};

export default ModalComponent;