import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styles from "./style.module.css";
import FavoriteSvg from "../../assets/svg/favoriteSvg";
import coinGeckoAPI from "../../mobx/store/index";
import ModalComponent from "../../components/modal";
import { useTranslation } from "react-i18next";

const MainScreen = observer(() => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const { t } = useTranslation();
    console.log("rendering");
    const openModal = (coin) => {
        setSelectedCoin(coin);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCoin(null);
        setModalIsOpen(false);
    };

    useEffect(() => {
        coinGeckoAPI.fetchData();
    }, []);


    return (
        <div className={styles.pos}>
            <div className={styles.mainScreen}>
                <div className={styles.coinList}>
                    {coinGeckoAPI.cryptoData.map((item, index) => (
                        <div className={styles.coinItem} key={item.id}>
                            <div className={styles.coinInfo} onClick={() => openModal(item)}>
                                <div className={styles.headerBox}>
                                <div className={styles.nameSymbol}>
                                    <img className={styles.img} src={item.image} alt="" />
                                    <span>{item.name} ({item.symbol.toUpperCase()})</span>
                                </div>

                                <div className={styles.price}>
                                    <span>{item.current_price.toFixed(2)}$</span>
                                </div>
                                </div>
                                <div className={styles.change24h}>
                                    <span style={{ color: item.market_cap_change_percentage_24h >= 0 ? "green" : "red" }}>
                                        <span>{t("mainScreen.title.change24h")}: </span>
                                        {item.market_cap_change_percentage_24h.toFixed(2)}%
                                    </span>
                                </div>
                                <div className={styles.volume24h}>
                                    <span><span>{t("mainScreen.title.volume24h")}</span>: {item.total_volume.toLocaleString()}$</span>
                                </div>
                                <div className={styles.marketCap}>
                                    <span><span>{t("mainScreen.title.marketCap")}</span>: {item.market_cap.toLocaleString()}$</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ModalComponent
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    selectedCoin={selectedCoin}
                />
            </div>
        </div>
    );
});

export default MainScreen;
