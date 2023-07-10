import { makeAutoObservable } from "mobx";
import {addDoc, collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {Currency} from "../types/CurrencyProp";
import {CardData} from "../types/CardDataType";

class TopUpStore {
    amount = 0;
    message = "";

    constructor() {
        makeAutoObservable(this);
    }

    setMessage(message: string) {
        this.message = message;
    }

    handleTopUpBalance = async (
        db: any,
        t: any,
        currency: Currency,
        userCards: CardData[],
        userId: string | undefined,
        selectedCard: any,
        selectedCardId: any,
        isCardBlocked: any
    ) => {
        if (isCardBlocked) {
            return this.setMessage(t("requisites.cardIsBlocked"));
        }
        if (!selectedCardId) {
            return this.setMessage(t("topUp.selectCard"))
        }
        try {
            const cardDocRef = doc(db, "cards", selectedCardId);
            const cardSnapshot = await getDoc(cardDocRef);

            if (!cardSnapshot.exists()) {
                console.error("Document not found");
                this.setMessage(t("topUp.errorMessage"));
                return;
            }

            const currentBalance = cardSnapshot.data().balance;
            const newBalance =
                currentBalance +
                (selectedCard &&
                selectedCard.data.currency === "USD" &&
                currency &&
                "UAH" in currency
                    ? this.amount / (currency.UAH as number)
                    : this.amount);

            await updateDoc(cardDocRef, {
                balance: newBalance,
            });

            const transactionsCollection = collection(db, "transactions");
            const transactionData = {
                userId,
                cardId: selectedCardId,
                cardNumber: cardSnapshot.data().cardNumber,
                amount: this.amount,
                date: new Date(),
                type: "Card Top-Up",
            };
            await addDoc(transactionsCollection, transactionData);

            console.log("Balance successfully topped up.");
            this.setMessage(t("topUp.successMessage"));
        } catch (error) {
            console.error("Error topping up balance: ", error);
            this.setMessage(t("topUp.errorMessage"));
        }
        setTimeout(() => {
            this.setMessage('');
        }, 3000);
    };

}

const topUpStore = new TopUpStore();
export default topUpStore
