import React, {useEffect, useState} from 'react';
import styles from './style.module.css';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {collection, getFirestore, onSnapshot, query} from "firebase/firestore";
import {app} from "../../config/firebase";
const db = getFirestore(app);
const PriceScreen = () => {
    const [clinicServices, setClinicServices] = useState([]);
    const [diagnosticsServices, setDiagnosticsServices] = useState([]);
    const [dentistryServices, setDentistryServices] = useState([]);
    useEffect(() => {
        const serviceCollection = collection(db, 'services', 'departments', 'clinic');
        const q = query(serviceCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setClinicServices(data);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    useEffect(() => {
        const serviceCollection = collection(db, 'services', 'departments', 'diagnostics');
        const q = query(serviceCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDiagnosticsServices(data);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    useEffect(() => {
        const serviceCollection = collection(db, 'services', 'departments', 'dentistry');
        const q = query(serviceCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDentistryServices(data);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className={styles.pricePos}>
            <div className={styles.price}>
                <h1>Цены</h1>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Поликлиника</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {clinicServices.map((item,index) => (
                            <div className={styles.titlePos} key={item.id}>
                                <p>
                                    {item.serviceName}
                                    <span>{item.price}руб.</span>
                                </p>
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Диагностика</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {diagnosticsServices.map((item) => (
                            <div className={styles.titlePos} key={item.id}>
                                <p>
                                    {item.serviceName}
                                    <span>{item.price}руб.</span>
                                </p>
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Стоматология</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {dentistryServices.map((item) => (
                            <div className={styles.titlePos} key={item.id}>
                                <p>
                                    {item.serviceName}
                                    <span>{item.price}руб.</span>
                                </p>
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>

    );
};
export default PriceScreen;