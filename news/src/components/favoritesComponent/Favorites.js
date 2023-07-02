import React from 'react';

const Favorites = ({favorites, addFavorites}) => {
    return (
        <div className="list favorites">
            {favorites.map((item, index) => (
                <div key={index} className="item">
                    <h2 className="title">{item.title}</h2>
                    <p className="description">{item.description}</p>
                    <button onClick={() => addFavorites(item)} className="remove-btn">
                        Убрать из избранного
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Favorites;