import { makeObservable, observable} from "mobx";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {auth, db} from "../config/firebase";

interface Card {
    id: string;
    data: any;
}
class UserDateStore {
    userDate: Card[] = [];

    constructor() {
        makeObservable(this,{
            userDate: observable
        });
    }


    useCurrentUserDate(url:string) {
        auth.onAuthStateChanged((user) => {
            const userId = user ? user.uid : undefined;
            if (userId) {
                const userCardsRef = collection(db, url);
                const cardsQuery = query(userCardsRef, where("userId", "==", userId));
                onSnapshot(cardsQuery, (querySnapshot) => {
                    this.userDate = querySnapshot.docs.map((doc) => ({
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