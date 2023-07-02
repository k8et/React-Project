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
import {useCurrentUserId} from "../../utils/hooks/useCurrentUserId";
import {useUserCards} from "../../utils/hooks/useUserCards";
import styles from "./style.module.css";
import P2P from "../../../src/assets/svg/ServiceP2P.svg";
import iconVisa from "../../assets/img/icon-visa-196578.png";
import iconMc from "../../assets/svg/mc_symbol.svg";
import {
    TextField,
} from "@mui/material";
import CardSelect from "../../components/cardSelect";
import ButtonPayment from "../../components/buttonPayment";
import {useParams} from "react-router-dom";
import {ComponentProps} from "../../types/ComponentProps";
import currencyStore from "../../stores/fetchCurrency";

const Transfer: FC<ComponentProps> = observer((props) => {
    const {t, theme} = props
    const [amount, setAmount] = useState<string>("");
    const userId = useCurrentUserId();
    const userCards = useUserCards(userId);
    const [message, setMessage] = useState<string | any>('')
    const {card} = useParams<{ card: string }>();
    const [destinationCardNumber, setDestinationCardNumber] = useState<string>(card || "");
    const [selectedCard, setSelectedCard] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sourceCard = userCards.find((card: any) => card.id === selectedCard);
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
            amountToTransfer *= (currencyStore.rate as any).UAH;
            updatedDestinationBalance += amountToTransfer;
            sourceCard.data.balance -= amountToTransfer / (currencyStore.rate as any).UAH;
        } else if (sourceCard.data.currency === 'UAH' && destinationCardData.currency === 'USD') {
            amountToTransfer /= (currencyStore.rate as any).UAH;
            updatedDestinationBalance += amountToTransfer;
            sourceCard.data.balance -= amountToTransfer * (currencyStore.rate as any).UAH;
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




    return (
        <div className={`${styles.main} ${theme === 'dark' ? styles.darkTheme : styles.lightTheme}`}>
            <div className={styles.trans}>
                <img src={P2P} alt=""/>
                <div className={styles.title}>
                    <h1>{t("transfer.title")}</h1>
                    <p>{t("transfer.description")}</p>
                </div>
                <div className={styles.icon}>
                    <img src={iconVisa} alt=""/>
                    <img src={iconMc} alt=""/>
                </div>
            </div>
            <div
                className={`${styles.wrapper} ${theme === 'dark' ? styles.wrapperDarkTheme : styles.wrapperLightTheme}`}>
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
            </div>
        </div>
    );
});

export default Transfer;