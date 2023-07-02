import React, {useState, useEffect} from 'react';
import {getFirestore, collection, query, onSnapshot} from 'firebase/firestore';
import {app} from '../../config/firebase';
import styles from './style.module.css';
import {TextField} from "@mui/material";

const db = getFirestore(app);
const docCollection = collection(db, 'doc');

const DocScreen = () => {
    const [searchValue, setSearchValue] = useState('');
    const [doctorsData, setDoctorsData] = useState([]);
    useEffect(() => {
        const q = query(docCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setDoctorsData(data);
        });

        return () => unsubscribe();
    }, []);
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
    const filteredDoctorsData = doctorsData.filter((doctor) => {
        const name = doctor.name.toLowerCase();
        const searchTerm = searchValue.toLowerCase();
        return name.includes(searchTerm);
    });
    return (
        <div>
            <div className={styles.searchDoc}>
                <h3>КЛИНИКО-ДИАГНОСТИЧЕСКИЙ ЦЕНТР. ВРАЧИ</h3>
                <TextField
                    size="small"
                    sx={{backgroundColor: 'white'}} id="searchDoctor" type="search" placeholder="Поиск по имени..."
                    value={searchValue} onChange={handleSearchChange}
                />
            </div>
            <div className={styles.cardContainerDoc}>
                {filteredDoctorsData.map((item) => (
                    <div className={styles.doctor} key={item.id}>
                        <img src={item.img} alt="doc"/>
                        <h1>{item.name}</h1>
                        <p>Стаж {item.experience} лет</p>
                        <p>{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocScreen;
