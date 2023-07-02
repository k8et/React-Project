import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useTranslation} from "react-i18next";

const CoinDetails = () => {
    const { coinId } = useParams();
    const [coinDetails, setCoinDetails] = useState(null);
    const [historicalPriceData, setHistoricalPriceData] = useState([]);
    const { t } = useTranslation();


    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
                const data = await response.json();
                setCoinDetails(data);
            } catch (error) {
                console.error('error fetch:', error);
            }
        };
        const fetchHistoricalPriceData = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`);
                const data = await response.json();
                setHistoricalPriceData(data.prices.map(([timestamp, price]) => ({ timestamp, price })));
            } catch (error) {
                console.error('Error fetching historical price data:', error);
            }
        };

        fetchCoinDetails();
        fetchHistoricalPriceData(); // Call the new function
    }, [coinId]);

    return (
        <div className={styles.container}>
            {coinDetails ? (
                <div className={styles.coinDetails}>
                    <img src={coinDetails.image.large} alt={coinDetails.name} className={styles.coinImage} />
                    <h1 className={styles.coinName}>{coinDetails.name}</h1>
                    <p className={styles.coinSymbol}>{coinDetails.symbol.toUpperCase()}</p>
                    <p>{t('coinDetails.currentPrice')}: ${coinDetails.market_data.current_price.usd}</p>
                    <p>{t('coinDetails.marketCap')}: ${coinDetails.market_data.market_cap.usd.toLocaleString()}</p>
                    <p>{t('coinDetails.volume24h')}: ${coinDetails.market_data.total_volume.usd.toLocaleString()}</p>
                    <p>{t('coinDetails.high24h')}: ${coinDetails.market_data.high_24h.usd}</p>
                    <p>{t('coinDetails.low24h')}: ${coinDetails.market_data.low_24h.usd}</p>
                    <p>{t('coinDetails.circulatingSupply')}: {coinDetails.market_data.circulating_supply.toLocaleString()} {coinDetails.symbol.toUpperCase()}</p>
                    <p>{t('coinDetails.totalSupply')}: {coinDetails.market_data.total_supply ? coinDetails.market_data.total_supply.toLocaleString() : 'N'}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className={styles.chartContainer}>
                <h2>{t('coinDetails.priceHistory')}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={historicalPriceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Price']} />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
};

export default CoinDetails;
