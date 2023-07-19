import {action, makeObservable, observable} from "mobx";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";

 interface CardData {
  id: string;
  data: any;
}

class GetDataStore {
  date: CardData[] = [];
  users: any = [];

  constructor() {
    makeObservable(this, {
      date: observable,
      users: observable,
      getData: action
    });
  }

  setUser = (value: any) => {
    this.users = value
  }
  setData = (value: any) =>{
    this.date = value
  }
  getData(url: string, setData: any) {
    auth.onAuthStateChanged((user) => {
      const userId = user ? user.uid : undefined;
      if (userId) {
        const userCardsRef = collection(db, url);
        const cardsQuery = query(userCardsRef, where("userId", "==", userId));
        onSnapshot(cardsQuery, (querySnapshot) => {
          const date = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setData(date)
        });
      }
    });
  }
}

const getDataStore = new GetDataStore();
export default getDataStore;