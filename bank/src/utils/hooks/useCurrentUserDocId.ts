import { useState, useEffect } from "react";
import { query, where, collection, onSnapshot} from "firebase/firestore";
import { db } from "../../config/firebase";
import {useCurrentUserId} from "./useCurrentUserId";

interface Card {
    id: string;
    data: any;
}
export const useCurrentUserDate = () => {
    const [userDate, setUserDate] = useState<Card[]>([]);
    const userId = useCurrentUserId()

    useEffect(() => {
        if (userId) {
            const fetchUserCards = () => {
                const userCardsRef = collection(db, "users");
                const cardsQuery = query(userCardsRef, where("userId", "==", userId));
                onSnapshot(cardsQuery, (querySnapshot) => {
                    const cards = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    setUserDate(cards);
                });
            };
            fetchUserCards();
        }
    }, [userId]);

    return userDate;
};

