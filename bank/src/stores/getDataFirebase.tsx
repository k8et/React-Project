import { makeObservable, observable } from "mobx";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export interface CardData {
  id: string;
  data: any;
}

class GetDataStore {
  date: CardData[] = [];

  constructor() {
    makeObservable(this, {
      date: observable,
    });
  }

  getData(url: string) {
    auth.onAuthStateChanged((user) => {
      const userId = user ? user.uid : undefined;
      if (userId) {
        const userCardsRef = collection(db, url);
        const cardsQuery = query(userCardsRef, where("userId", "==", userId));
        onSnapshot(cardsQuery, (querySnapshot) => {
          this.date = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
        });
      }
    });
  }
}

const getDataStore = new GetDataStore();
export default getDataStore;