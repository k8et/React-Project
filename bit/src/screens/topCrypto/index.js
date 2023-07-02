import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import coinGeckoAPI from '../../mobx/store';
import styles from './style.module.css';
import {useTranslation} from "react-i18next";

const TopCryptoScreen = observer(() => {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(50);
    const { t } = useTranslation();

    useEffect(() => {
        coinGeckoAPI.fetchData();
    }, []);

    const handleDisplayTop = (start, end) => {
        setStartIndex(start);
        setEndIndex(end);
    };

    return (
        <div className={styles.pos}>
            <div className={styles.buttonGroup}>
                <h3>{t('topCryptoScreen.topCrypto')}</h3>
                <button onClick={() => handleDisplayTop(0, 50)}>{t('topCryptoScreen.top50')}</button>
                <button onClick={() => handleDisplayTop(50, 80)}>{t('topCryptoScreen.top30')}</button>
                <button onClick={() => handleDisplayTop(80, 90)}>{t('topCryptoScreen.top10')}</button>
            </div>
            <div className={styles.mainScreen}>
                <div className={styles.title}>
                    <span>#</span>
                    <span>{t('topCryptoScreen.title.coin')}</span>
                    <span></span>
                    <span>{t('topCryptoScreen.title.price')}</span>
                    <span>{t('topCryptoScreen.title.24h')}</span>
                    <span>{t('topCryptoScreen.title.24hVolume')}</span>
                    <span>{t('topCryptoScreen.title.mktCap')}</span>
                </div>
                {coinGeckoAPI.cryptoData
                    .slice(startIndex, endIndex)
                    .map((item, index) => (
                        <div key={item.id} className={styles.data}>
                            <span>{startIndex + index + 1}</span>
                            <span><img className={styles.img} src={item.image} alt="" /></span>
                            <span>{item.name} ({item.symbol.toUpperCase()})</span>
                            <span>${item.current_price.toFixed(2)}</span>
                            <span style={{color: item.market_cap_change_percentage_24h >=0 ? 'green' : 'red'}}>
                                {`${item.market_cap_change_percentage_24h.toFixed(2)}%`}
                            </span>
                            <span>${item.total_volume.toLocaleString()}</span>
                            <span>${item.market_cap.toLocaleString()}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
});

export default TopCryptoScreen;
