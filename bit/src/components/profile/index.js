import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { app } from '../../config/firebase';
import Logout from '../../config/Logout';
import coinGeckoAPI from '../../mobx/store';
import styles from './style.module.css';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const auth = getAuth(app);
    const user = auth.currentUser;

    const handleEmailUpdate = async () => {
        try {
            await updateEmail(user, email);
            setEmail('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePasswordUpdate = async () => {
        try {
            await updatePassword(user, password);
            setPassword('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    console.log('Object.entries(coinGeckoAPI.userPortfolio)',coinGeckoAPI.userPortfolio)

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>{t('profile.heading')}</h1>
            <div className={styles.inputContainer}>
                <h3 className={styles.subtitle}>{t('profile.updateEmail')}</h3>
                <input
                    type="email"
                    placeholder={t('profile.newEmailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleEmailUpdate} className={styles.button}>
                    {t('profile.updateEmailBtn')}
                </button>
            </div>
            <div className={styles.inputContainer}>
                <h3 className={styles.subtitle}>{t('profile.updatePassword')}</h3>
                <input
                    type="password"
                    placeholder={t('profile.newPasswordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handlePasswordUpdate} className={styles.button}>
                    {t('profile.updatePasswordBtn')}
                </button>
            </div>
            <Logout />
            <h3 className={styles.backLink}>
                {t('profile.backToHome')} <Link to="/" className={styles.link}>{t('profile.backToHomeLink')}</Link>
            </h3>
            <h2 className={styles.balance}>{t('profile.balance')}: ${coinGeckoAPI.userBalance.toFixed(2)}</h2>
            <h2 className={styles.portfolio}>{t('profile.portfolio')}:</h2>
            <ul className={styles.coinList}>
                {Object.entries(coinGeckoAPI.userPortfolio).map(([coinId, amount]) => {
                    const coin = coinGeckoAPI.cryptoData.find((coin) => coin.id === coinId);
                    return (
                        <li key={coinId} className={styles.coinItem}>
                            {coin.name} ({coin.symbol.toUpperCase()}):{' '}
                            {error && <p className={styles.error}>{error}</p>} {amount.toFixed(4)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Profile;
