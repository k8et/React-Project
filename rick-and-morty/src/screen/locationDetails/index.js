import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import BtnGoBack from "../../components/btnGoBack";
import { Link } from "react-router-dom";

const LocationDetails = ({ selectedLocation, handleCloseInfoLocation }) => {
    const [locationDetails, setLocationDetails] = useState([]);
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchLocation = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/location/${selectedLocation}`);
            const locationData = await response.json();
            setLocationDetails(locationData);
        };
        fetchLocation();
    }, [selectedLocation]);

    useEffect(() => {
        const fetchResidents = async () => {
            const residentsData = [];
            for (const residentUrl of locationDetails.residents) {
                const response = await fetch(residentUrl);
                const resident = await response.json();
                residentsData.push(resident);
            }
            setResidents(residentsData);
        };
        if (locationDetails.residents) {
            fetchResidents();
        }
    }, [locationDetails]);

    return (
        <div className={styles.locationDetailsComp}>
            <div className={styles.btnPos}><Link to='/locations'><BtnGoBack onClick={handleCloseInfoLocation}></BtnGoBack></Link></div>
            {locationDetails && (
                <div className={styles.main}>
                    <div className={styles.mainComp}>
                        <div className={styles.locationText}>{locationDetails.name}</div>
                        <div className={styles.compon}>
                            <div><h3>Type</h3><p>{locationDetails.type}</p></div>
                            <div><h3>Dimension</h3><p>{locationDetails.dimension}</p></div>
                        </div>
                    </div>
                        <div className={styles.resident}>
                            <h3>Resident</h3>
                            <div className={styles.residentPos}>
                                {residents.slice(0,12).map((item,index) => (
                                    <div key={index} className={styles.card}>
                                        <img src={item.image} alt=""/>
                                        <div className={styles.name}>{item.name}</div>
                                        <div className={styles.species}>{item.species}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
            )}
        </div>
    );
};

export default LocationDetails;
