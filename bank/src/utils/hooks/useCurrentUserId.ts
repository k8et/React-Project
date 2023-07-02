import { useState, useEffect } from "react";
import {auth} from "../../config/firebase";


 export const useCurrentUserId = () => {
    const [userId, setUserId] = useState<any>('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(undefined);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return userId;
};