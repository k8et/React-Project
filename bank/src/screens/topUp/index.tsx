import React, { FC, useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import styles from "./style.module.css";
import { db } from "../../config/firebase";
import { observer } from "mobx-react";
import { useCurrentUserId } from "../../utils/hooks/useCurrentUserId";
import { useUserCards } from "../../utils/hooks/useUserCards";
import { Box, TextField, Typography } from "@mui/material";
import Top from "../../assets/svg/ServiceBonds.svg";
import CardSelect from "../../components/cardSelect";
import ButtonPayment from "../../components/buttonPayment";
import { ComponentProps } from "../../types/ComponentProps";
import currencyStore from "../../stores/fetchCurrency";

const TopUp: FC<ComponentProps> = observer((props) => {
  const { theme, t } = props;
  const [amount, setAmount] = useState<number>(0);
  const [currencySymbol, setCurrencySymbol] = useState<string>("");
  const [message, setMessage] = useState<any>("");
  const [selectedCardId, setSelectedCardId] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isCardBlocked, setCardBlocked] = useState<boolean>(false);
  const userId = useCurrentUserId();
  const userCards = useUserCards(userId);


  useEffect(() => {
    if (userId && userCards && selectedCardId) {
      const card = userCards.find((card) => card.id === selectedCardId);
      console.log("Selected card", card);
      setSelectedCard(card);
      if (card) {
        setCardBlocked(card.data.isBlocked)
        if (card.data.currency === "USD") {
          setCurrencySymbol("USD");
        } else {
          setCurrencySymbol("UAH");
        }
      }
    }
  }, [userCards, userId, selectedCardId]);


  useEffect(() => {
    if (userId && userCards) {
      setSelectedCardId(userCards[0].id);
    }
  }, [userCards]);

  const handleTopUpBalance = async (event: React.FormEvent) => {
    event.preventDefault();

    if(isCardBlocked){
      setMessage(t("requisites.cardIsBlocked"))
      return
    }
    if (!selectedCardId) {
      setMessage(t("topUp.selectCard"));
      return;
    }
    try {
      const cardDocRef = doc(db, "cards", selectedCardId);
      const cardSnapshot = await getDoc(cardDocRef);

      if (!cardSnapshot.exists()) {
        console.error("Document not found");
        setMessage(t("topUp.errorMessage"));
        return;
      }

      const currentBalance = cardSnapshot.data().balance;
      const newBalance = currentBalance +
          ((selectedCard && selectedCard.data.currency === "USD" && currencyStore.rate && 'UAH' in currencyStore.rate)
              ? amount / (currencyStore.rate.UAH as number)
              : amount);

      await updateDoc(cardDocRef, {
        balance: newBalance,
      });

      const transactionsCollection = collection(db, "transactions");
      const transactionData = {
        userId,
        cardId: selectedCardId,
        cardNumber: cardSnapshot.data().cardNumber,
        amount,
        date: new Date(),
        type: "Card Top-Up",
      };
      await addDoc(transactionsCollection, transactionData);

      console.log("Balance successfully topped up.");
      setMessage(t("topUp.successMessage"));
    } catch (error) {
      console.error("Error topping up balance: ", error);
      setMessage(t("topUp.errorMessage"));
    }
    setMessage("")
  };

  return (
      <Box
          className={`${styles.main} ${
              theme === "dark" ? styles.darkTheme : styles.lightTheme
          }`}
      >
        <div className={styles.trans}>
          <img src={Top} alt="" />
          <div className={styles.title}>
            <h1>{t("topUp.pageTitle")}</h1>
          </div>
        </div>
        <div
            className={`${styles.wrapper} ${
                theme === "dark" ? styles.wrapperDarkTheme : styles.wrapperLightTheme
            }`}
        >
          <form onSubmit={handleTopUpBalance} className={styles.form}>
            <Box className={styles.formGroup}>
              <CardSelect
                  title={t("topUp.cardTopUp")}
                  selectedCard={selectedCardId}
                  setSelectedCard={setSelectedCardId}
                  userCards={userCards}
              />
            </Box>
            <Box className={styles.formGroup}>
              <TextField
                  type="number"
                  value={amount}
                  label={t("topUp.amountLabel")}
                  placeholder={currencySymbol}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  required
                  className={styles.input}
              />
            </Box>
            <ButtonPayment type={"submit"}>{t("topUp.topUpButton")}</ButtonPayment>
            <Typography>{message}</Typography>
          </form>
        </div>
      </Box>
  );
});

export default TopUp;
