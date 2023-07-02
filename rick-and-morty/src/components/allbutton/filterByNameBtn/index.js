import React from 'react';
import styles from "./style.module.css";

const FilterByName = ({onChange,style}) => {
    return (
            <input className={styles.search} type="search" placeholder={"Filter by name..."}
                   onChange={onChange} style={style} />
    );
};

export default FilterByName;