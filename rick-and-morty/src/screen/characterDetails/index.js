import React, { useState, useEffect } from 'react';
import styles from "./style.module.css";
import {Link} from "react-router-dom";
import ArrowBack24Px from "../../assets/svg/arrow-back-24px";

const CharacterDetails = ({selectedCharacter,handleCloseInfo}) => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            const episodeNumbers = selectedCharacter.episode.map(
                (episodeUrl) => episodeUrl.slice(40)
            );
// TODO УЧИ СУКА ПРОМИСЫ
            const response = await Promise.all(
                episodeNumbers.map((episodeNumber) =>
                    fetch(`https://rickandmortyapi.com/api/episode/${episodeNumber}`)
                )
            );
            const episodesData = await Promise.all(
                response.map((episode) => episode.json())
            );
            setEpisodes(episodesData);
            //console.log(episodesData)
        };

        fetchEpisodes();
    }, [selectedCharacter]);
    console.log(`character ${selectedCharacter}`)
    return (
        <div className={styles.mainCharacterDetails}>
            <Link to='/' className={styles.Line}>
                <div className={styles.btnPos}>
                    <ArrowBack24Px/>
                    <button onClick={handleCloseInfo} className={styles.btnBack}> GO BACK </button>
                </div>
            </Link>
            {selectedCharacter && (
                <div>
                    <div className={styles.detailsBox}>
                        <img className={styles.img} src={selectedCharacter.image} alt="" />
                        <h3>{selectedCharacter.name}</h3>
                    </div>
                    <div className={styles.informationEpisodesPos}>
                        <div className={styles.information}>
                            <h3 className={styles.infText}>Information</h3>
                            <div className={styles.status}>
                                <h3>Gender</h3>
                                <p>{selectedCharacter.gender}</p>
                                <h3>Status</h3>
                                <p>{selectedCharacter.status}</p>
                                <h3>Origin</h3>
                                <p>{selectedCharacter.origin.name}</p>
                                <h3>Type</h3>
                                <p>{selectedCharacter.type ? selectedCharacter.type : 'Unknown'}</p>
                                <h3>Location</h3>
                                <p>{selectedCharacter.origin.name}</p>
                            </div>
                        </div>
                        <div className={styles.episodes}>
                            <h3 className={styles.episText}>Episodes</h3>
                            <div>
                                {episodes.slice(0,4).map((episode) => (
                                    <div key={episode.id} className={styles.episodesText}>
                                        <div className={styles.episodeSXEXX}>{episode.episode}</div>
                                        <div className={styles.episodeName}>{episode.name}</div>
                                        <div className={styles.episodeDate}>{episode.air_date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterDetails;
