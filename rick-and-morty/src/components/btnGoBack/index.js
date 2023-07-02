import React from 'react';
import styles from "./style.module.css";
import ArrowBack24Px from "../../assets/svg/arrow-back-24px";

const BtnGoBack = ({onClick}) => {
    return (
        <div className={styles.btnSvg}>
            <ArrowBack24Px/><button onClick={onClick}  className={styles.btnBack}> GO BACK </button>
        </div>
    );
};

export default BtnGoBack;