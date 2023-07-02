import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {useTranslation} from "react-i18next";

const Logout = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("isLoggedIn");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <button onClick={handleLogout}>{t('logout.logout')}</button>
    );
};

export default Logout;