import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import BtnGoBack from '../../components/btnGoBack';
import { Link } from 'react-router-dom';

const EpisodeDetails = ({ selectedEpisode, handleCloseInfoEpisode }) => {
    const [episodeDetails, setEpisodeDetails] = useState(null);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchEpisode = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${selectedEpisode}`);
            const episodeData = await response.json();
            setEpisodeDetails(episodeData);
        };
        fetchEpisode();
    }, [selectedEpisode]);

    useEffect(() => {
        const fetchCharacters = async () => {
            let charactersData = [];
            for (let characterUrl of episodeDetails?.characters || []) {
                const response = await fetch(characterUrl);
                const character = await response.json();
                charactersData.push(character);
            }
            setCharacters(charactersData);
        };
        if (episodeDetails?.characters) {
            fetchCharacters();
        }
    }, [episodeDetails]);

    return (
        <div>
            <div className={styles.btnPos}>
                <Link className={styles.link} to="/episodes">
                    <BtnGoBack onClick={handleCloseInfoEpisode} />
                </Link>
            </div>
            {episodeDetails && (
                <div className={styles.main}>
                    <div className={styles.mainComp}>
                        <div className={styles.episodeText}>{episodeDetails.name}</div>
                        <div className={styles.compon}>
                            <div>
                                <h3>Date</h3>
                                <p>{episodeDetails.air_date}</p>
                            </div>
                            <div>
                                <h3>Episode</h3>
                                <p>{episodeDetails.episode}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.character}>
                        <h3>Cast</h3>
                        <div className={styles.characterPos}>
                            {characters.slice(0, 12).map((item, index) => (
                                <div key={index} className={styles.card}>
                                    <img src={item.image} alt="" />
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

export default EpisodeDetails;
