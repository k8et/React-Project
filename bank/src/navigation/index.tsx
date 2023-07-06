import React, { FC, useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RegisterScreen from "../screens/singUp";
import SignIn from "../screens/signIn";
import LeftSide from "../components/layout/leftSide";
import Header from "../components/layout/header";
import TopUp from "../screens/topUp";
import Transfer from "../screens/transfer";
import TopUpPhone from "../screens/topUpPhone";
import BlockCard from "../screens/blockCard";
import TransactionHistory from "../screens/transactionHistory";
import Requisites from "../screens/requisites";
import Cards from "../screens/cards";
import HomePage from "../screens/homePage";
import Profile from "../screens/profile";
import PasswordReset from "../screens/passwordReset";
import ChatBot from "../components/chatBot";
import { ThemeContext } from "../components/themeProvider";
import { useTranslation } from "react-i18next";
import dataStore from "../stores/fetchData";
import { Currency } from "../types/CurrencyProp";
import styles from "./style.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import getDataStore from "../stores/getDataFirebase";

const Navigation: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/signIn";
  const isPasswordReset = location.pathname === "/password-reset";
  const isChatBotPage = !(isLoginPage || isRegisterPage || isPasswordReset);
  const [currency, setCurrency] = useState<Currency>({});
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const userCards = getDataStore.date;
  useEffect(() => {
    dataStore
      .fetchData(
        "https://v6.exchangerate-api.com/v6/d124b21f0ba10987b5ad7399/latest/USD"
      )
      .then(() => {
        setCurrency(dataStore.data.conversion_rates);
      });
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    getDataStore.getData("cards");
  }, []);

  if (!themeContext) {
    return null;
  }
  const { theme } = themeContext;
  return (
    <div>
      <div className={styles.main}>
        {!isLoginPage && !isRegisterPage && !isPasswordReset && <LeftSide />}
        <div className={styles.header}>
          {!isLoginPage && !isRegisterPage && !isPasswordReset && (
            <Header currency={currency} />
          )}
          <Routes>
            <Route path="/cards" element={<Cards theme={theme} t={t} />} />
            <Route path="/" element={<RegisterScreen />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route
              path="/top-up"
              element={<TopUp currency={currency} theme={theme} t={t} />}
            />
            <Route
              path="/transfer/:card"
              element={<Transfer currency={currency} theme={theme} t={t} />}
            />
            <Route
              path="/transfer"
              element={<Transfer currency={currency} theme={theme} t={t} />}
            />
            <Route
              path="/top-up-phone"
              element={<TopUpPhone theme={theme} t={t} />}
            />
            <Route
              path="/top-up-phone/:phone"
              element={<TopUpPhone theme={theme} t={t} />}
            />
            <Route
              path="/block-card"
              element={<BlockCard userCards={userCards} theme={theme} t={t} />}
            />
            <Route
              path="/transaction-history"
              element={<TransactionHistory theme={theme} t={t} />}
            />
            <Route
              path="/requisites"
              element={<Requisites theme={theme} t={t} />}
            />
            <Route
              path="/requisites/:iBan"
              element={<Requisites theme={theme} t={t} />}
            />
            <Route
              path="/home"
              element={<HomePage theme={theme} currency={currency} t={t} />}
            />
            <Route path="/profile" element={<Profile theme={theme} t={t} />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
        </div>
      </div>
      {isChatBotPage && <ChatBot />}
    </div>
  );
};

export default Navigation;
