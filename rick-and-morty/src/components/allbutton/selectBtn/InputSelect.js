import React from 'react';
import styles from './style.module.css'

const Select = ({ options, label, onChange }) => {
    return (
        <select className={styles.select} onChange={onChange}>
            <option value="">
                {label}
            </option>
           {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;