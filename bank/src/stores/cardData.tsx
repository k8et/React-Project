import { makeObservable, observable} from "mobx";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {auth, db} from "../config/firebase";

interface Card {
    id: string;
    data: any;
}
class UserDateStore {
    cardDate: Card[] = [];

    constructor() {
        makeObservable(this,{
            cardDate: observable
        });
    }

    useCurrentUserDate() {
        auth.onAuthStateChanged((user) => {
            const userId = user ? user.uid : undefined;
            if (userId) {
                const userCardsRef = collection(db, "users");
                const cardsQuery = query(userCardsRef, where("userId", "==", userId));
                onSnapshot(cardsQuery, (querySnapshot) => {
                    this.cardDate = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                });
            }
        });
    }
}

const userDateStore = new UserDateStore();
export default userDateStore;