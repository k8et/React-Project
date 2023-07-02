import React, {useState} from 'react';
import Modal from 'react-modal';
import coinGeckoAPI from "../../mobx/store";
import {BuySellButton, CloseButton, FavoriteButton, Input, ModalWrapper, TransactionError} from "./style";
import FavoriteSvg from "../../assets/svg/favoriteSvg";
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";


const ModalComponent = observer(({ isOpen, onRequestClose, selectedCoin }) => {
    const [amount, setAmount] = useState("");
    const [transactionError, setTransactionError] = useState(null);
    const { t } = useTranslation();
    const handleBuy = () => {
        try {
            coinGeckoAPI.buyCoin(selectedCoin.id, parseFloat(amount));
            setAmount("");
            setTransactionError('Вы успешно приобрели монету');
        } catch (error) {
            setTransactionError(error.message);
        }
    };

    const handleSell = () => {
        try {
            coinGeckoAPI.sellCoin(selectedCoin.id, parseFloat(amount));
            setAmount("");
            setTransactionError('Вы успешно продали монету');
        } catch (error) {
            setTransactionError(error.message);
        }
    };
    const calculateTotalCost = () => {
        if (selectedCoin && amount) {
            return (amount * selectedCoin.current_price).toFixed(2);
        }
        return 0;
    };
    const handleToggleFavorite = (id) => {
        coinGeckoAPI.toggleFavorite(id);
    };


    const renderFavoriteButton = (coinId) => {
        if (coinId === selectedCoin.id) {
            return (
                <FavoriteButton onClick={() => handleToggleFavorite(coinId)}>
                    {coinGeckoAPI.favorites.includes(coinId) ? (
                        <FavoriteSvg fill={"orange"} />
                    ) : (
                        <FavoriteSvg fill={"gold"} />
                    )}
                </FavoriteButton>
            );
        }
        return null;
    };
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={{
                    content: {
                        border: 'none',
                        background: 'transparent',
                        overflow: 'auto',
                        outline: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }}
            >
                {selectedCoin && (
                    <ModalWrapper>
                        {renderFavoriteButton(selectedCoin.id)}
                        <h2>
                            {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
                        </h2>
                        <img style={{width:'120px'}} src={selectedCoin.image} alt={selectedCoin.name} />
                        <p>{t('modal.currentPrice')}: {selectedCoin.current_price}</p>
                        <p>
                            {t('modal.change24h')}: {selectedCoin.market_cap_change_percentage_24h.toFixed(2)}%
                        </p>
                        <p>{t('modal.tradeVolume24h')}: {selectedCoin.total_volume}</p>
                        <p>{t('modal.marketCap')}: {selectedCoin.market_cap}</p>
                        <p>{t('modal.circulatingSupply')}: {selectedCoin.circulating_supply}</p>
                        <p>{t('modal.maxSupply')}: {selectedCoin.max_supply || 'N/A'}</p>
                        <p>{t('modal.ath')}: {selectedCoin.ath}</p>
                        {selectedCoin && (
                            <Input>
                                <h3>{t('modal.buySell')}</h3>
                                <p>{t('modal.balance')}: ${coinGeckoAPI.userBalance.toFixed(2)}</p>
                                <input
                                    type="number"
                                    placeholder={t('modal.numberOfCoins')}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <p>
                                    {t('modal.totalCost')}: ${calculateTotalCost()}
                                </p>
                                <div>
                                <BuySellButton onClick={handleBuy}>{t('modal.buy')}</BuySellButton>
                                <BuySellButton onClick={handleSell}>{t('modal.sell')}</BuySellButton>
                                </div>
                                {transactionError && <p>{transactionError}</p>}
                            </Input>
                        )}
                        <CloseButton onClick={onRequestClose}>{t("modal.close")}</CloseButton>
                    </ModalWrapper>
                )}
            </Modal>
        </div>
    );
});

export default ModalComponent;
