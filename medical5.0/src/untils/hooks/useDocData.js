import { useState, useEffect } from "react";
import {getDocs, query, where, collection, onSnapshot, getFirestore} from "firebase/firestore";
import {app} from "../../config/firebase";
const db = getFirestore(app);

export const useDocData = () => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'doc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDocs(data);
        });
        return () => unsubscribe();
    }, []);

    return docs;
};