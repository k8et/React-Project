import React from 'react';
import styles from "./style.module.css";
import FavoriteSvg from "../../../../bit/src/assets/svg/favoriteSvg";

const Favorite = ({favoriteCharacters,handleAddFavorite}) => {
    return (
        <div className={styles.favoriteComp}>
            <div className={styles.cardComp}>
                {favoriteCharacters.map((item) => (
                    <div key={item.id}>
                        <div className={styles.cards}>
                            <button onClick={() => handleAddFavorite(item)} className={styles.addBtn}>
                                <FavoriteSvg fill="orange"/>
                            </button>
                            <img src={item.image} alt="" />
                            <div>{item.name}</div>
                            <p>{item.species}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorite;