import React, {useState, useEffect} from "react";
import {Button, Modal, TextField, Typography} from "@mui/material";
import {collection, query, orderBy, onSnapshot, where, addDoc, deleteDoc, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import styles from "./style.module.css";
import ChatIcon from '@mui/icons-material/Chat';

const AdminSupportChat = () => {
    const [selectedEmail, setSelectedEmail] = useState("");
    const [messages, setMessages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchMessages = () => {
            const messagesRef = collection(db, "messages");
            let q = query(messagesRef, orderBy("timestamp", "asc"));

            if (selectedEmail.trim() !== "") {
                q = query(
                    messagesRef,
                    orderBy("timestamp", "asc"),
                    where("email", "==", selectedEmail)
                );
            }

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const updatedMessages = snapshot.docs.map((doc) => doc.data());
                setMessages(updatedMessages);
            });

            return () => {
                unsubscribe();
            }
        };

        fetchMessages();
    }, [selectedEmail]);


    const clearMessages = async () => {
        const messagesRef = collection(db, "messages");

        const q = query(messagesRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        setMessages([]);
    };

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
        setIsChatOpen(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedEmail("");
        setIsModalOpen(false);
        setIsChatOpen(false);
    };

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage.trim() === "") {
            return;
        }

        const message = {
            text: newMessage,
            name: "admin",
            email: selectedEmail,
            timestamp: new Date(),
        };

        try {
            await addDoc(collection(db, "messages"), message);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const uniqueEmails = Array.from(new Set(messages.map((message) => message.email)));

    return (
        <div className={styles.container}>
            <Button variant="outlined" startIcon={<ChatIcon/>} onClick={() => setIsChatOpen(true)}>
                Open Chats
            </Button>

            <Modal open={isChatOpen} onClose={handleCloseModal}>
                <div className={styles.modal}>
                    <div className={styles.modalCon}>
                        <Typography className={styles.allChat} variant="h3">Все чаты</Typography>
                        {uniqueEmails.map((email, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                onClick={() => handleEmailClick(email)}
                            >
                                {email}
                            </Button>
                        ))}
                        <div className={styles.deleteClose}>
                            <Button variant="outlined" onClick={clearMessages}>
                                Удалить чаты
                            </Button>
                            <Button variant="outlined" onClick={handleCloseModal}>
                                Закрыть
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <div className="modal">
                    <div className={styles.modalContent}>
                        <Typography variant="h5">Чат с {selectedEmail}</Typography>
                        <div className={styles.chatMessages}>
                            {messages
                                .filter((message) => message.email === selectedEmail)
                                .map((message, index) => (
                                    <div
                                        key={index}
                                        className={
                                            message.name === "admin"
                                                ? styles.adminMessage
                                                : styles.userMessage
                                        }
                                    >
                                        <Typography variant="body1" component="span">
                                            <strong>
                                                {message.name === "admin" ? "Вы:" : `${message.email}:`}
                                            </strong>{" "}
                                            {message.text}
                                        </Typography>
                                    </div>
                                ))}
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <TextField
                                type="text"
                                label="Message"
                                variant="outlined"
                                value={newMessage}
                                onChange={handleInputChange}
                            />
                            <div>
                            <Button sx={{width: '210px', marginRight: '10px'}} type="submit" variant="contained">
                                Send
                            </Button>
                            <Button sx={{width: '100px'}} onClick={handleCloseModal} variant="contained">
                                Close
                            </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminSupportChat;
