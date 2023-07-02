import Select from "../../components/allbutton/selectBtn/InputSelect";
import { genderOptions, speciesOptions, statusOptions } from "../../mock/selectOptions";
import styles from "./style.module.css";
import logo from "../../assets/png/rick-and-morty-logo.png";
import {Link} from "react-router-dom";
import FilterByName from "../../components/allbutton/filterByNameBtn";
import BtnLoadMore from "../../components/allbutton/btnLoadMore";
import Loader from "../../components/loader";
import FavoriteSvg from "../../../../bit/src/assets/svg/favoriteSvg";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import store from "../../components/store/characterStore";

const Characters = observer((props) => {
    const {
        favoriteCharacters, handleAddFavorite, filteredCharacters,
        handleSpeciesChange, handleGenderChange, handleStatusChange,
        handleNameSearch, num, handleLoadMore, handleCardClick
    } = props

    useEffect(() => {
        store.fetchCharacters();
    }, [])

    return (
        <div className={styles.charactersComp}>
            <div className={styles.logoPos}>
                <img className={styles.logo} src={logo} alt="" />
            </div>
            <div className={styles.inputBox}>
                <FilterByName onChange={handleNameSearch}/>
                <Select options={speciesOptions} label="Species" onChange={handleSpeciesChange} />
                <Select options={genderOptions} label="Gender" onChange={handleGenderChange} />
                <Select options={statusOptions} label="Status" onChange={handleStatusChange} />
            </div>
                <div className={styles.cardComp}>
                    {filteredCharacters.length ? (
                        store.characters.slice(0, num).map((item, index)  => (
                            <div key={index}>
                                    <div className={styles.cards} onClick={() => handleCardClick(item) }>
                                        {favoriteCharacters.includes(item) ? (
                                            <button onClick={() => handleAddFavorite(item)} className={styles.addBtn}>
                                                <FavoriteSvg fill="orange"/>
                                            </button>
                                        ) : (
                                            <button onClick={() => handleAddFavorite(item)} className={styles.addBtn}>
                                                <FavoriteSvg fill="gray"/>
                                            </button>
                                        )}
                                        <Link to={'/characterDetails'} className={styles.Link}>
                                            <img src={item.image} alt="" />
                                        </Link>
                                        <div>{item.name}</div>
                                        <p>{item.species}</p>
                                    </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.load}><Loader /></div>
                    )}
                </div>
            <div className={styles.btnPos}>
                <BtnLoadMore onclick={handleLoadMore}/>
            </div>
        </div>
    );
});

export default Characters;
