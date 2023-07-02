import React from 'react';
import {Link} from "react-router-dom";
import BookmarkStar from "../../assets/Bookmark-star";

const Header = ({submit,count,setCount,search,setSearch}) => {
    return (
        <div>
            <form onSubmit={submit}>
                <div className="inputBox">
                    <Link to="/" className="back-btn"><img src="https://cdn-icons-png.flaticon.com/512/21/21601.png" alt="" width={100} height={100}/></Link>
                    <label htmlFor="countInput">Количество новостей:</label>
                    <input
                        type="number"
                        value={count}
                        name={"countInput"}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                    <label htmlFor={"searchInput"}>Поиск:</label>
                    <input
                        type="text"
                        value={search}
                        name={"searchInput"}
                        onChange={(e) => setSearch(String(e.target.value))}
                    />
                    <button type="submit">Поиск</button>
                    <Link to="/favorites" className="news-btn">{BookmarkStar()}</Link>
                </div>
            </form>
        </div>
    );
};

export default Header;