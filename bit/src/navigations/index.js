import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../config/Login';
import Register from '../config/Register';
import { observer } from 'mobx-react';
import Favorites from '../screens/favorites';
import MainScreen from '../screens/mainScreen';
import Header from "../components/header";
import { useLocation } from "react-router-dom";
import TopCryptoScreen from "../screens/topCrypto";
import Profile from "../components/profile";
import CoinDetails from "../screens/coinInfo";


const Navigation = observer(() => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";
    const isProfilePage = location.pathname === "/profile"

    return (
        <div>
            {!(isLoginPage || isRegisterPage || isProfilePage) && <Header />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<MainScreen />} />
                <Route path="profile" element={<Profile/>}/>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/topCrypto" element={<TopCryptoScreen/>}/>
                <Route path="/coin/:coinId" element={<CoinDetails />} />
            </Routes>
        </div>
    );
});

export default Navigation;
