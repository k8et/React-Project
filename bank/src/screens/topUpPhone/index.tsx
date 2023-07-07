import React, { useState, FormEvent } from "react";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { observer } from "mobx-react";
import styles from './style.module.css'
import serviceMob from "../../assets/svg/ServiceMobile.svg"
import { Box, TextField } from '@mui/material';
import CardSelect from "../../components/cardSelect";
import ButtonPayment from "../../components/buttonPayment";
import { useParams } from "react-router-dom";
import {ComponentProps} from "../../types/ComponentProps";
import {CardData} from "../../types/CardDataType";

interface TopUpPhonePage extends ComponentProps{
  userId: string | undefined
  userCards: CardData[]
}
const TopUpPhonePage: React.FC<TopUpPhonePage> = observer((props) => {
  const {t,theme, userId,userCards} = props
  const [selectedCardId, setSelectedCardId] = useState("");
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string | any>('')
  const { phone } = useParams<{ phone: string }>();
  const [phoneNumber, setPhoneNumber] = useState(phone || "");
  const handleTopUp = async (e: FormEvent) => {
    e.preventDefault();
    const selectedCard: any = userCards.find((card) => card.id === selectedCardId);
    if (selectedCard?.data.isBlocked){
      setMessage(t("requisites.cardIsBlocked"))
      return;
    }
    const amountToNum = parseFloat(amount)
    if (selectedCard) {
      const updatedBalance = selectedCard.data.balance - amountToNum;

      if (updatedBalance >= 0) {
        const cardRef = doc(db, "cards", selectedCard.id);
        await updateDoc(cardRef, { balance: updatedBalance });

        const transactionData = {
          userId: userId,
          cardId: selectedCard.id,
          cardNumber: selectedCard.data.cardNumber,
          phoneNumber: phoneNumber,
          amount: amountToNum,
          date: new Date(),
          type: t("topUpPhonePage.title"),
        };

        await addDoc(collection(db, "transactions"), transactionData);

        setMessage(t("topUpPhonePage.balanceUpdated"));
      } else {
        setMessage(t("topUpPhonePage.insufficientBalance"));
      }
    } else {
      setMessage(t("topUpPhonePage.noCardsFound"));
    }
    setMessage('')
  };


  return (
      <Box className={`${styles.main} ${theme === 'dark' ? styles.darkTheme : styles.lightTheme}`}>
        <Box className={styles.trans}>
          <img src={serviceMob} alt="" />
          <Box className={styles.title}>
            <h1>{t("topUpPhonePage.title")}</h1>
            <p>{t("topUpPhonePage.description")}</p>
          </Box>
        </Box>
        <Box className={`${styles.wrapper} ${theme === 'dark' ? styles.wrapperDarkTheme : styles.wrapperLightTheme}`}>
          <form onSubmit={handleTopUp} className={styles.form}>
            <CardSelect
                selectedCard={selectedCardId}
                setSelectedCard={setSelectedCardId}
                userCards={userCards}
                title={t("topUpPhonePage.cardDebit")}
            />
            <Box className={styles.formGroup}>
              <TextField
                  label={t("topUpPhonePage.phoneNumber")}
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Box>
            <Box className={styles.formGroup}>
              <TextField
                  label={t("topUpPhonePage.amount")}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
              />
            </Box>
            <ButtonPayment type={'submit'}>
              {t("topUpPhonePage.topUpButton")}
            </ButtonPayment>
            {message}
          </form>
        </Box>
      </Box>
  );
});

export default TopUpPhonePage;
