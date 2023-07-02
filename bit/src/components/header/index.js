import React, { useEffect, useRef, useState } from 'react';
import UserSvg from '../../assets/svg/userSvg';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import coinGeckoAPI from '../../mobx/store';
import SearchDropdown from '../searchDropdown';
import bitLogo from '../../../src/assets/img/logoBit.png'
import {useTranslation} from "react-i18next";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchInput = useRef(null);
    const searchWrapper = useRef(null);
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        coinGeckoAPI.setSearchQuery(e.target.value);
    };
    const handleInputFocus = () => {
        setShowDropdown(true);
    };

    const handleClickOutside = (e) => {
        if (searchWrapper.current && !searchWrapper.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const searchResults = JSON.parse(JSON.stringify(coinGeckoAPI.searchCoins(searchQuery)));
    console.log(searchResults);

    const changeLang = (lng) =>{
        if (i18n.language === lng){
            return 'white'
        }
        return 'black'
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerPos}>
                <div className={styles.aSide}>
                    <img className={styles.bit} src={bitLogo} alt="Logo" />
                    <Link className={styles.a} to="/">
                        <h3>{t('header.coin')}</h3>
                    </Link>
                    <Link className={styles.a} to="/topCrypto">
                        <h3>{t('header.cryptoTop')}</h3>
                    </Link>
                    <Link className={styles.a} to="/favorites">
                        <h3>{t('header.portfolio')}</h3>
                    </Link>
                </div>
                <div className={styles.bSide}>
                    <Link className={styles.a} to="/profile">
                        <UserSvg />
                    </Link>
                    <div className={styles.searchWrapper} ref={searchWrapper}>
                        <input
                            ref={searchInput}
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleInputFocus}
                        />
                        {showDropdown && searchResults.length > 0 && (
                            <SearchDropdown searchResults={searchResults} />
                        )}
                    </div>
                    <div className={styles.languageSwitcher}>
                        <button
                            style={{color: changeLang('en')}}
                            onClick={() => changeLanguage("en")}
                        >
                            EN
                        </button>
                        <button
                            style={{color: changeLang('ru')}}
                            onClick={() => changeLanguage("ru")}
                        >
                            RU
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
