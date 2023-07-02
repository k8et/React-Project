import React from 'react';
import styles from "./style.module.css";

const BtnLoadMore = ({onclick}) => {
    return (
        <button className={styles.btn} onClick={onclick}>
            Load more
        </button>
    );
};

export default BtnLoadMore;