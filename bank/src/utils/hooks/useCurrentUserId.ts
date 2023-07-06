import { useState, useEffect } from "react";
import {auth} from "../../config/firebase";


 export const useCurrentUserId = () => {
    const [userId, setUserId] = useState<any>('');

    useEffect(() => {
         auth.onAuthStateChanged((user) => {
            setUserId(user ? user.uid : undefined);
        });
    }, []);

    return userId;
};