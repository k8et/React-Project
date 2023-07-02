import { useState } from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
import Favorites from "./components/favoritesComponent/Favorites";
import News from "./components/newsComponent/News";
import Header from "./components/headerComponent/Header";

const App = () => {
    const [data, setData] = useState(null);
    const [count, setCount] = useState(10);
    const [search, setSearch] = useState();
    const [favorites, setFavorites] = useState([]);

    const fetchData = async () => {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${search}&language=ru&apiKey=50461044f124421ba203db922539a920&pageSize=${count}`
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
    };

    const submit = (event) => {
        event.preventDefault();
        fetchData();
    }

    const addFavorites = (article) => {
        const isDuplicate = favorites.includes(article)
        if (isDuplicate){
            setFavorites(favorites.filter((item)=>item !== article))
        }
        else {
            setFavorites([...favorites, zarticle])
        }
    }

    return (
        <div>
            <Header
                count={count}
                search={search}
                setSearch={setSearch}
                setCount={setCount}
                submit={submit}
            />
            <Routes>
                <Route path="/favorites" element={<Favorites
                    favorites={favorites}
                    addFavorites={addFavorites}
                />}/>
                <Route path="/" element={<News
                    favorites={favorites} data={data}
                    addFavorites={addFavorites}
                />}/>
            </Routes>
        </div>
    );
}

export default App;
