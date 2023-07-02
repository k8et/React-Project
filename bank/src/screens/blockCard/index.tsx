import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { observer } from "mobx-react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./style.module.css";
import CardSelect from "../../components/cardSelect";
import cardBlock from "../../assets/svg/CardBlock.svg";
import { useCurrentUserId } from "../../utils/hooks/useCurrentUserId";
import { useUserCards } from "../../utils/hooks/useUserCards";
import { ComponentProps } from "../../types/ComponentProps";

const BlockCard: React.FC<ComponentProps> = observer((props) => {
  const { t, theme } = props;
  const [selectedCardId, setSelectedCardId] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<any>("");
  const userId = useCurrentUserId();
  const userCards = useUserCards(userId);

  const handleBlockCard = async () => {
    setLoading(true);
    try {
      const cardDocRef = doc(db, "cards", selectedCardId);
      await updateDoc(cardDocRef, { isBlocked: !isBlocked });

      setMessage(
        `Card ${
          !isBlocked
            ? t("blockCard.successBlock")
            : t("blockCard.successUnblock")
        }`
      );
      setIsBlocked(!isBlocked);
    } catch (error) {
      console.error(
        "Error occurred while blocking/unblocking the card: ",
        error
      );
      setMessage(t("blockCard.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className={`${styles.main} ${
        theme === "dark" ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <Box className={styles.trans}>
        <img src={cardBlock} alt="" />
        <Box className={styles.title}>
          <h1>{t("blockCard.title")}</h1>
          <p>{t("blockCard.description")}</p>
        </Box>
      </Box>
      <Box
        className={`${styles.wrapper} ${
          theme === "dark" ? styles.wrapperDarkTheme : styles.wrapperLightTheme
        }`}
      >
        <Box className={styles.formGroup}>
          <CardSelect
            title={t("blockCard.selectCard")}
            selectedCard={selectedCardId}
            setSelectedCard={setSelectedCardId}
            userCards={userCards}
          />
        </Box>
        <Button
          className={styles.button}
          onClick={handleBlockCard}
          disabled={loading}
          variant="contained"
        >
          {isBlocked
            ? t("blockCard.unblockButton")
            : t("blockCard.blockButton")}
        </Button>
        {message && (
          <Typography className={styles.message}>{message}</Typography>
        )}
      </Box>
    </Box>
  );
});

export default BlockCard;
