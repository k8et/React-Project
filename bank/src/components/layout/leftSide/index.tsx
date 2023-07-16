import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Select, MenuItem, SelectChangeEvent} from "@mui/material";
import styles from "./style.module.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import {Link} from "react-router-dom";
import ThemeSwitcher from "../../themeSwitcher";
import {ThemeContext} from "../../themeProvider";
import BurgerMenu from "../../burgerMenu";

const LeftSide = () => {
    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLanguageChange = (event: SelectChangeEvent) => {
        i18n.changeLanguage(event.target.value).then(r => r);
    };
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        return null;
    }
    const {theme} = themeContext;
    return (
        <div>
            {windowWidth <= 1024 ? (
                <BurgerMenu/>) : (
                <div
                    className={`${styles.main} ${
                        theme === "dark" ? styles.darkTheme : styles.lightTheme
                    }`}
                >
                    <div className={styles.iconLogoPos}>
                        <WidgetsIcon sx={{width: "28px"}}/>
                        <h3>LoyalBank</h3>
                    </div>
                    <div className={styles.nav}>
                        <div>
                            <WidgetsIcon/>
                            <Link to="/home">{t("leftSide.myBank")}</Link>
                        </div>
                        <div>
                            <CreditCardIcon/>
                            <Link to="/cards">{t("leftSide.myCard")}</Link>
                        </div>
                        <div>
                            <PaymentsIcon/>
                            <Link to="/requisites">{t("leftSide.payment")}</Link>
                        </div>
                        <div>
                            <HistoryIcon/>
                            <Link to="/transaction-history">{t("leftSide.history")}</Link>
                        </div>
                        <div>
                            <PersonIcon/>
                            <Link to="/profile">{t("leftSide.myProfile")}</Link>
                        </div>
                    </div>
                    <Select
                        variant={"standard"}
                        size={"small"}
                        value={i18n.language}
                        onChange={handleLanguageChange}
                        className={styles.i18n}
                        sx={{color: "white"}}
                    >
                        <MenuItem value={"en"}>English</MenuItem>
                        <MenuItem value={"ru"}>Русский</MenuItem>
                    </Select>
                    <ThemeSwitcher className={styles.themeSwitcher}/>
                </div>
            )}
        </div>
    );
};

export default LeftSide;
