import { action, makeObservable } from "mobx";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import React from "react";
import { CardData } from "../types/CardDataType";

class PaymentStore {
  iban = "";

  constructor() {
    makeObservable(this, {
      setIban: action,
    });
  }

  handlePaymentSubmit = async (
    e: React.FormEvent,
    userCards: CardData[],
    userId: any,
    selectedCard: string,
    t: any,
    amount: string,
    setMessage: any
  ) => {
    e.preventDefault();
    console.log("action");
    const sourceCard: any = userCards.find(
      (card: any) => card.id === selectedCard
    );
    if (sourceCard?.data.isBlocked) {
      setMessage(t("requisites.cardIsBlocked"));
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

    const q = query(
      collection(db, "cards"),
      where("accountNumber", "==", this.iban)
    );
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
      iban: this.iban,
    };
    await addDoc(transactionsCollection, transactionData);

    setMessage(t("requisites.paymentSuccess"));
  };

  setIban(iban: string) {
    this.iban = iban;
  }

}

const paymentStore = new PaymentStore();
export default paymentStore;
