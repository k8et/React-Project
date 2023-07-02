import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const SearchDropdown = ({ searchResults }) => {
    const navigate = useNavigate();

    const handleCoinClick = (coinId, event) => {
        event.stopPropagation();
        navigate(`/coin/${coinId}`);
        console.log(`Nav to /coin/${coinId}`);
    };

    return (
        <div className={styles.searchDropdown}>
            {searchResults.map(coin => (
                <div key={coin.id} className={styles.searchResult}
                     onClick={(event) => {
                         console.log('Clicked:', coin);
                         handleCoinClick(coin.id, event);
                     }}>
                    <img
                        src={coin.image}
                        alt={coin.name}
                        className={styles.coinImage}
                    />
                    <div
                        className={styles.coinInfo}
                    >
                        <span className={styles.coinName}>{coin.name}</span>
                        <span className={styles.coinSymbol}>{coin.symbol.toUpperCase()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchDropdown;
