import React, { useState, useEffect } from "react";
import { Button, Modal, TextField } from "@mui/material";
import {collection, addDoc, query, orderBy, onSnapshot, where} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import styles from './style.module.css'
import ChatIcon from '@mui/icons-material/Chat';
import {onAuthStateChanged} from "firebase/auth";

const SupportChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userEmail = user.email;
                console.log(userEmail)
                const messagesRef = collection(db, "messages");
                const q = query(messagesRef, where("email", "==", userEmail), orderBy("timestamp", "asc"));

                const unsubscribeFromSnapshot = onSnapshot(q, (snapshot) => {
                    const updatedMessages = snapshot.docs.map((doc) => doc.data());
                    setMessages(updatedMessages);
                });

                return () => {
                    unsubscribeFromSnapshot();
                }
            } else {
                console.error("User not logged in.");
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);





    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputValue.trim() === "") return;

        const user = auth.currentUser;
        if (!user) {
            console.error("User not logged in.");
            window.alert("Для отправки сообщения нужно войти в аккаунт!"); // Add this
            return;
        }

        const message = {
            text: inputValue,
            timestamp: new Date(),
            email: user.email,
            name: 'user',
        };

        // Update local state immediately
        setMessages((prevMessages) => [...prevMessages, message]);

        try {
            await addDoc(collection(db, "messages"), message);
            setInputValue("");
        } catch (error) {
            console.error("Error sending message:", error);
            // If the Firestore update fails, remove the message from local state
            setMessages((prevMessages) => prevMessages.filter((m) => m !== message));
        }
    };


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={styles.container}>
            <Button variant="contained" startIcon={<ChatIcon/>} onClick={handleOpen}>Чат поддержки</Button>

            <Modal open={isOpen} onClose={handleClose}>
                <div className={styles.modalContent}>
                    <h2 style={{marginBottom: '5px'}}>Чат</h2>
                    <div style={{ height: "300px", overflowY: "scroll" }}>
                        {messages.map((message, index) => {
                            const isFromAdmin = message.name === 'admin';

                            return (
                                <div key={index} className={isFromAdmin ? styles.adminMessage : styles.userMessage}>
                                    <strong>{isFromAdmin ? `admin:` : 'Вы:'} </strong><span style={{marginLeft: '5px', wordWrap: "break-word"}}>{message.text}</span>
                                </div>
                            );
                        })}
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <TextField
                            label="Message"
                            variant="outlined"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <Button type="submit" variant="contained">Send</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default SupportChat;