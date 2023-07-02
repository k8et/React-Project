import React from 'react';

const News = ({data,favorites,addFavorites}) => {
    return (
        <div>
            <>
                {data ? (
                    <>
                        <div className="list">
                            {data.articles.map((item, index) => (
                                <div key={index} className="item">
                                    <h2 className="title">{item.title}</h2>
                                    <p className="description">{item.description}</p>
                                    {favorites.includes(item) ? (
                                        <button onClick={() => addFavorites(item)} className="added-btn">
                                            Добавлено в избранное
                                        </button>
                                    ) : (
                                        <button onClick={() => addFavorites(item)} className="add-btn">
                                            Добавить в избранное
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Loading data...</p>
                )}
            </>
        </div>
    );
};

export default News;