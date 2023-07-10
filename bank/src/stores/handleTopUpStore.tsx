import { makeAutoObservable } from "mobx";
import {addDoc, collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {Currency} from "../types/CurrencyProp";
import {CardData} from "../types/CardDataType";
import React, {Dispatch, SetStateAction} from "react";
import {db} from "../config/firebase";

class TopUpStore {


    constructor() {
        makeAutoObservable(this);
    }


    handleTopUpBalance = async (
        event: React.FormEvent,
        t: ((key:string)=>string),
        currency: Currency,
        userCards: CardData[],
        userId: string | undefined,
        selectedCard: CardData | undefined,
        selectedCardId: string,
        isCardBlocked: boolean,
        setMessage: Dispatch<SetStateAction<string>>,
        amount: string,
    ) => {
        event.preventDefault();
        if (isCardBlocked) {
            return setMessage(t("requisites.cardIsBlocked"));
        }
        if (!selectedCardId) {
            return setMessage(t("topUp.selectCard"))
        }
        try {
            const cardSnapshot = await this.getCardSnapshot(selectedCardId);

            if (!cardSnapshot.exists()) {
                console.error("Document not found");
                setMessage(t("topUp.errorMessage"));
                return;
            }
            const amountToTransfer = parseFloat(amount)
            const currentBalance = cardSnapshot.data().balance;
            const newBalance =
                currentBalance +
                (selectedCard &&
                selectedCard.data.currency === "USD" &&
                currency &&
                "UAH" in currency
                    ? amountToTransfer / (currency.UAH as number)
                    : amountToTransfer);

            await updateDoc(doc(db, "cards", selectedCardId), {
                balance: newBalance,
            });

            await this.addTransaction(
                userId,
                selectedCardId,
                cardSnapshot.data().cardNumber,
                amountToTransfer
            );

            console.log("Balance successfully topped up.");
            setMessage(t("topUp.successMessage"));
        } catch (error) {
            console.error("Error topping up balance: ", error);
            setMessage(t("topUp.errorMessage"));
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };
    getCardSnapshot = async (cardId: string) => {
        const cardDocRef = doc(db, "cards", cardId);
        return await getDoc(cardDocRef);
    };
    addTransaction = async (
        userId: string | undefined,
        cardId: string,
        cardNumber: string,
        amount: number
    ) => {
        const transactionsCollection = collection(db, "transactions");
        const transactionData = {
            userId,
            cardId,
            cardNumber,
            amount,
            date: new Date(),
            type: "Card Top-Up",
        };
        await addDoc(transactionsCollection, transactionData);
    };

}

const topUpStore = new TopUpStore();
export default topUpStore
