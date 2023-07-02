import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

interface CardData {
  currency: string;
  balance: number;
  cardNumber: string;
  isBlocked: boolean;
  userId: string;
  expirationDate: string;
  cvv: number;
  cardType: string;
  accountNumber:string;
  cardColor:string;

}

interface Card {
  id: string;
  data: CardData;
}


export const useUserCards = (userId: string) => {
  const [userCards, setUserCards] = useState<Card[]>([]);

  useEffect(() => {
    if (userId) {
      const fetchUserCards = () => {
        const userCardsRef = collection(db, "cards");
        const cardsQuery = query(userCardsRef, where("userId", "==", userId));
        onSnapshot(cardsQuery, (querySnapshot) => {
          const cards = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data() as CardData,
          }));
          setUserCards(cards);
        });
      };
      fetchUserCards();
    }
  }, [userId]);

  return userCards;
};

