import styles from "./style.module.css";
import FilterByNameBtn from "../../components/allbutton/filterByNameBtn";
import BtnLoadMore from "../../components/allbutton/btnLoadMore";
import {Link} from "react-router-dom";
import logo from "../../assets/png/rick-and-morty-episode.png";
import Loader from "../../components/loader";
const Episodes = ({handleCardClickEpisode,handleLoadMoreEpisode,handleNameSearch,filteredEpisode,numEpisode}) => {
    return (
        <div className={styles.locationsComp}>
            <img src={logo} alt=""/>
            <div className={styles.inputBox}>
                <FilterByNameBtn onChange={handleNameSearch} style={{width: "500px"}} />
            </div>
            <div className={styles.planetBox}>
                {filteredEpisode.length ? (
                filteredEpisode.slice(0,numEpisode).map((item, index) => (
                    <Link to='/episodeDetails' className={styles.linkLocationDetails} onClick={()=>handleCardClickEpisode(item.id)} key={index} >
                        <div  className={styles.card}>
                            <div className={styles.cardName}>{item.name}</div>
                            <div className={styles.cardType}>{item.air_date}</div>
                            <div className={styles.cardEpisode}>{item.episode}</div>
                        </div>
                    </Link>
                ))
                    ): (
                    <div className={styles.load}><Loader /></div>
                    )}
                <div className={styles.btnPos}>
                    <BtnLoadMore onclick={handleLoadMoreEpisode} />
                </div>
            </div>
        </div>
    );
};

export default Episodes;