import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainScreen from "../screens/mainScreen";
import {Route, Routes, useLocation} from "react-router-dom";
import DocScreen from "../screens/docScreen";
import PriceScreen from "../screens/priceScreen";
import Login from "../components/Login";
import RegisterForm from "../components/Singup";
import Profile from "../components/Profile";
import AdminPanel from "../screens/adminPanel";
import ProctologyScreen from "../screens/department/proctologyScreen";
import GynecologyScreen from "../screens/department/gynecologyScreen";
import UrologyScreen from "../screens/department/urologyScreen";
import NeurologyScreen from "../screens/department/neurologyScreen";
import OphthalmologyScreen from "../screens/department/ophthalmologyScreen";
import DreamDentistryScreen from "../screens/department/dreamDentistryScreen";
import CardiologyScreen from "../screens/department/cardiologyScreen";
import DentalTreatmentUnderAMicroscope from "../screens/department/dentalTreatmentUnderAMicroscope";
import UltraSound from "../screens/department/ultraSound";
import Biopsy from "../screens/department/biobsy";
import LaborotoryScreen from "../screens/laborotoryScreen";
import Payment from "../components/Payment";
import styles from './style.module.css'
import SupportChat from "../components/Chat";
import AdminSupportChat from "../components/adminSupChat";
import ForgotPassword from "../components/forgotPassword";

const Navigation = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/singUp";
    const isProfilePage = location.pathname === "/profile";
    const isAdminPage = location.pathname === "/adminPanel";
    const isPaymentPage = location.pathname === "/payment";
    const isForgotPage = location.pathname === "/forgotPassword";
    const shouldDisplaySupportChat = !(isLoginPage || isRegisterPage || isProfilePage || isPaymentPage || isAdminPage || isForgotPage);
    return (<>
        {!(isLoginPage || isRegisterPage || isProfilePage || isPaymentPage || isAdminPage || isForgotPage) && <Header/>}
        <Routes>
            <Route path={'/'} element={<MainScreen/>}/>
            <Route path={'/doc'} element={<DocScreen/>}/>
            <Route path={'/price'} element={<PriceScreen/>}/>
            <Route path={'/singUp'} element={<RegisterForm/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/profile'} element={<Profile/>}/>
            <Route path={'/adminPanel'} element={<AdminPanel/>}/>
            <Route path={'/proctology'} element={<ProctologyScreen/>}/>
            <Route path={'/gynecology'} element={<GynecologyScreen/>}/>
            <Route path={'/urology'} element={<UrologyScreen/>}/>
            <Route path={'/neurology'} element={<NeurologyScreen/>}/>
            <Route path={'/ophthalmology'} element={<OphthalmologyScreen/>}/>
            <Route path={'/dreamDentistry'} element={<DreamDentistryScreen/>}/>
            <Route path={'/cardiology'} element={<CardiologyScreen/>}/>
            <Route path={'/dentalTreatment'} element={<DentalTreatmentUnderAMicroscope/>}/>
            <Route path={'/ultraSound'} element={<UltraSound/>}/>
            <Route path={'/biopsy'} element={<Biopsy/>}/>
            <Route path={'/laborotory'} element={<LaborotoryScreen/>}/>
            <Route path={'/payment'} element={<Payment/>}/>
            <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
        {shouldDisplaySupportChat && <SupportChat className={styles.SupportChat}/>}
        {isAdminPage && <AdminSupportChat className={styles.SupportChat}/>}
        {!(isLoginPage || isRegisterPage || isProfilePage || isPaymentPage || isAdminPage || isForgotPage) && <Footer/>}
    </>);
};

export default Navigation;