import React, {FC, useState} from "react";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import {db} from "../../config/firebase";
import {observer} from "mobx-react";
import styles from "./style.module.css";
import P2P from "../../../src/assets/svg/ServiceP2P.svg";
import iconVisa from "../../assets/img/icon-visa-196578.png";
import iconMc from "../../assets/svg/mc_symbol.svg";
import {
    Box,
    TextField,
} from "@mui/material";
import CardSelect from "../../components/cardSelect";
import ButtonPayment from "../../components/buttonPayment";
import {useParams} from "react-router-dom";
import {ComponentProps} from "../../types/ComponentProps";
import {Currency} from "../../types/CurrencyProp";
import {getThemeClass} from "../../utils/DarkLightStyle";
import {CardData} from "../../types/CardDataType";

interface TransferProps extends ComponentProps {
    currency: Currency
    userId: string | undefined
    userCards: CardData[]
}

const Transfer: FC<TransferProps> = observer((props) => {
    const {t, theme, currency, userId, userCards} = props
    const [amount, setAmount] = useState<string>("");
    const [message, setMessage] = useState<string | any>('')
    const {card} = useParams<{ card: string }>();
    const [destinationCardNumber, setDestinationCardNumber] = useState<string>(card || "");
    const [selectedCard, setSelectedCard] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sourceCard: any = userCards.find((card: any) => card.id === selectedCard);
        if (sourceCard?.data.isBlocked) {
            setMessage(t("requisites.cardIsBlocked"));
            return;
        }

        if (!sourceCard || !destinationCardNumber) {
            setMessage(t("transfer.sourceCardNotFound"));
            return;
        }

        const destinationCardRef = collection(db, "cards");
        const destinationCardQuery = query(
            destinationCardRef,
            where("cardNumber", "==", destinationCardNumber)
        );

        const destinationCardSnapshot = await getDocs(destinationCardQuery);

        if (destinationCardSnapshot.empty) {
            setMessage(t("transfer.destinationCardNotFound"));
            return;
        }

        const destinationCardDoc = destinationCardSnapshot.docs[0];
        const destinationCardData = destinationCardDoc.data();

        let amountToTransfer = parseFloat(amount);
        let updatedDestinationBalance = destinationCardData.balance;

        if (sourceCard.data.currency === 'USD' && destinationCardData.currency === 'UAH') {
            amountToTransfer *= currency.UAH;
            updatedDestinationBalance += amountToTransfer;
            sourceCard.data.balance -= amountToTransfer / currency.UAH;
        } else if (sourceCard.data.currency === 'UAH' && destinationCardData.currency === 'USD') {
            amountToTransfer /= currency.UAH;
            updatedDestinationBalance += amountToTransfer;
            sourceCard.data.balance -= amountToTransfer * currency.UAH;
        }

        await updateDoc(doc(db, "cards", sourceCard.id), {
            balance: sourceCard.data.balance,
        });

        await updateDoc(doc(db, "cards", destinationCardDoc.id), {
            balance: updatedDestinationBalance,
        });

        const transactionsCollection = collection(db, "transactions");
        const transactionData = {
            userId,
            cardId: selectedCard,
            cardNumber: sourceCard.data.cardNumber,
            amount: amountToTransfer,
            date: new Date(),
            type: t("transfer.transferType"),
            onCard: destinationCardNumber,
        };
        await addDoc(transactionsCollection, transactionData);

        console.log(t("transfer.transferSuccess"));

        setAmount("");
        setDestinationCardNumber("");
        setMessage("");
    };

    const wrapperTheme = `${styles.wrapper} ${theme === 'dark' ? styles.wrapperDarkTheme : styles.wrapperLightTheme}`

    return (
        <Box className={getThemeClass(theme, styles)}>
            <Box className={styles.trans}>
                <img src={P2P} alt=""/>
                <Box className={styles.title}>
                    <h1>{t("transfer.title")}</h1>
                    <p>{t("transfer.description")}</p>
                </Box>
                <Box className={styles.icon}>
                    <img src={iconVisa} alt=""/>
                    <img src={iconMc} alt=""/>
                </Box>
            </Box>
            <Box
                className={wrapperTheme}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <CardSelect
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        userCards={userCards}
                        title={t("transfer.cardDebit")}
                    />
                    <TextField
                        className={styles.formGroup}
                        label={t("transfer.destinationCard")}
                        type="number"
                        value={destinationCardNumber}
                        onChange={(e) => setDestinationCardNumber(e.target.value)}
                        required
                    />
                    <TextField
                        className={styles.formGroup}
                        label={t("transfer.amount")}
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <ButtonPayment type={'submit'}>
                        {t("transfer.transferButton")}
                    </ButtonPayment>
                    <p>{message}</p>
                </form>
            </Box>
        </Box>
    );
});

export default Transfer;