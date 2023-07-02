import React, {useState, useEffect} from "react";
import {getDocs, updateDoc, collection, doc, deleteDoc} from "firebase/firestore";
import {db} from "../../config/firebase";

const PaymentTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPaymentData();
    }, []);

    const fetchPaymentData = async () => {
        const paymentsRef = collection(db, "payments");
        const querySnapshot = await getDocs(paymentsRef);

        const paymentData = [];
        querySnapshot.forEach((doc) => {
            const payment = {
                id: doc.id,
                ...doc.data(),
            };
            paymentData.push(payment);
        });

        setData(paymentData);
    };

    const handleUpdatePayment = async (id, updatedPaymentData) => {
        try {
            const {id: paymentId, ...dataWithoutId} = updatedPaymentData; // Exclude the 'id' field
            const paymentRef = doc(db, "payments", id);
            await updateDoc(paymentRef, dataWithoutId);
            console.log("Payment updated successfully");
        } catch (error) {
            console.error("Error updating payment:", error);
        }
    };

    const handleDeletePayment = async (id) => {
        try {
            const paymentRef = doc(db, "payments", id);
            await deleteDoc(paymentRef);
            console.log("Payment deleted successfully");
            const updatedPaymentData = data.filter((payment) => payment.id !== id);
            setData(updatedPaymentData);
        } catch (error) {
            console.error("Error deleting payment:", error);
        }
    };
    const handleInputChange = (event, id, field) => {
        const updatedPaymentData = data.map((payment) => {
            if (payment.id === id) {
                return {
                    ...payment,
                    [field]: event.target.value,
                };
            }
            return payment;
        });

        setData(updatedPaymentData);
        handleUpdatePayment(id, updatedPaymentData.find((payment) => payment.id === id));
    };

    return (
        <table style={{borderCollapse: "collapse"}}>
            <thead>
            <tr>
                <th style={{border: "1px solid black", padding: "8px", fontWeight: "bold"}}>Имя отправителя</th>
                <th style={{border: "1px solid black", padding: "8px", fontWeight: "bold"}}>Почта отправителя</th>
                <th style={{border: "1px solid black", padding: "8px", fontWeight: "bold"}}>Телефон отправителя</th>
                <th style={{border: "1px solid black", padding: "8px", fontWeight: "bold"}}>Имя врача</th>
                <th style={{border: "1px solid black", padding: "8px", fontWeight: "bold"}}>Статус</th>
                <th style={{border: "1px solid black", padding: "8px", fontWeight: "bold"}}>Чек</th>
                <th style={{border: "1px solid black", padding: "8px", fontWeight: "bold"}}>Действие</th>
            </tr>
            </thead>
            <tbody>
            {data.map((payment) => (
                <tr key={payment.id}>
                    <td style={{border: "1px solid black", padding: "8px"}}>
                        <input
                            type="text"
                            value={payment.payerName}
                            onChange={(event) => handleInputChange(event, payment.id, "payerName")}
                        />
                    </td>
                    <td style={{border: "1px solid black", padding: "8px"}}>
                        <input
                            type="text"
                            value={payment.payerEmail}
                            onChange={(event) => handleInputChange(event, payment.id, "payerEmail")}
                        />
                    </td>
                    <td style={{border: "1px solid black", padding: "8px"}}>
                        <input
                            type="text"
                            value={payment.payerPhone}
                            onChange={(event) => handleInputChange(event, payment.id, "payerPhone")}
                        />
                    </td>
                    <td style={{border: "1px solid black", padding: "8px"}}>
                        <input
                            type="text"
                            value={payment.doctorName}
                            onChange={(event) => handleInputChange(event, payment.id, "doctorName")}
                        />
                    </td>
                    <td style={{border: "1px solid black", padding: "8px"}}>
                        <select
                            value={payment.paymentStatus}
                            onChange={(event) => handleInputChange(event, payment.id, "paymentStatus")}
                        >
                            <option value="В обработке">В обработке</option>
                            <option value="Выполнено">Выполнено</option>
                            <option value="Отменено">Отменено</option>
                        </select>
                    </td>

                    <td style={{border: "1px solid black", padding: "8px"}}>
                        <input
                            type="text"
                            value={payment.receiptURL}
                            onChange={(event) => handleInputChange(event, payment.id, "receiptURL")}
                        />
                    </td>
                    <td style={{border: "1px solid black", padding: "8px", display: 'flex'}}>
                        <button onClick={() => window.open(payment.receiptURL, "_blank")} style={{marginLeft: "8px"}}>
                           Открыть чек
                        </button>
                        <button onClick={() => handleDeletePayment(payment.id)}>Удалить</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PaymentTable;
