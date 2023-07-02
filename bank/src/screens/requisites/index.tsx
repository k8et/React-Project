import React, { FC, useState } from "react";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "./style.module.css";
import { useCurrentUserId } from "../../utils/hooks/useCurrentUserId";
import { useUserCards } from "../../utils/hooks/useUserCards";
import {
  Box,
  TextField,
} from "@mui/material";
import CardSelect from "../../components/cardSelect";
import ServicePayment from "../../assets/svg/ServicePayments.svg";
import ButtonPayment from "../../components/buttonPayment";
import { useParams } from "react-router-dom";
import {ComponentProps} from "../../types/ComponentProps";

const Requisites: FC<ComponentProps> = (props) => {
  const {t,theme} = props
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { iBan } = useParams<{ iBan: string }>()
  const [message, setMessage] = useState<string | any>('')
  const [iban, setIban] = useState<string>(iBan || "");
  const userId = useCurrentUserId();
  const userCards = useUserCards(userId);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sourceCard = userCards.find((card: any) => card.id === selectedCard);
    if (sourceCard?.data.isBlocked){
      setMessage(t("requisites.cardIsBlocked"))
      return;
    }
    if (!sourceCard) {
      setMessage(t("requisites.selectSourceCard"));
      return;
    }

    const amountToTransfer = parseFloat(amount);
    if (isNaN(amountToTransfer)) {
      setMessage(t("requisites.enterValidAmount"));
      return;
    }

    if (sourceCard.data.balance < amountToTransfer) {
      setMessage(t("requisites.insufficientBalance"));
      return;
    }

    const q = query(collection(db, "cards"), where("accountNumber", "==", iban));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setMessage(t("requisites.recipientCardNotFound"));
      return;
    }

    const recipientCardDoc = querySnapshot.docs[0];
    const recipientCard = recipientCardDoc.data();

    if (!recipientCard || recipientCard.balance === undefined) {
      setMessage(t("requisites.errorFetchingRecipientCard"));
      return;
    }

    await updateDoc(doc(db, "cards", sourceCard.id), {
      balance: sourceCard.data.balance - amountToTransfer,
    });

    await updateDoc(recipientCardDoc.ref, {
      balance: recipientCard.balance + amountToTransfer,
    });

    const transactionsCollection = collection(db, "transactions");
    const transactionData = {
      userId,
      cardId: selectedCard,
      cardNumber: sourceCard.data.cardNumber,
      amount: amountToTransfer,
      date: new Date(),
      type: t("requisites.transferType"),
      iban,
    };
    await addDoc(transactionsCollection, transactionData);

    setMessage(t("requisites.paymentSuccess"));

    setAmount("");
    setIban("");
    setMessage("")
  };

  return (
      <Box className={`${styles.main} ${theme === 'dark' ? styles.darkTheme : styles.lightTheme}`}>
        <div className={styles.trans}>
          <img src={ServicePayment} alt="" />
          <div className={styles.title}>
            <h1>{t("requisites.payments")}</h1>
            <p>{t("requisites.noQueue")}</p>
          </div>
        </div>
        <Box className={`${styles.container} ${theme === 'dark' ? styles.containerDarkTheme : styles.containerLightTheme}`}>
          <form className={styles.form} onSubmit={handlePaymentSubmit}>
            <CardSelect
                title={t("requisites.sourceCard")}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                userCards={userCards}
            ></CardSelect>
            <TextField
                label={t("requisites.transferAmount")}
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
                label="IBAN"
                type="text"
                id="reference"
                name="reference"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
            />
            <ButtonPayment type="submit">
              {t("requisites.pay")}
            </ButtonPayment>
            {message}
          </form>
        </Box>
      </Box>
  );
};

export default Requisites;
