import React, {useEffect, useState} from 'react';
import Header from "../header";
import Footer from "../footer";
import Characters from "../../screen/charactes";
import useFetch from "../../utils/hooks/useFetch";
import {Route, Routes} from "react-router-dom";
import CharacterDetails from "../../screen/characterDetails";
import Locations from "../../screen/locations";
import LocationDetails from "../../screen/locationDetails";
import Episodes from "../../screen/episodes";
import EpisodeDetails from "../../screen/episodeDetails";
import Favorite from "../../screen/favorite";

const MainComponent = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [num, setNum] = useState(8);
    const [nameFilter, setNameFilter] = useState("");
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const[numLocation,setNumLocation] = useState(12)

    const [location, setLocation] = useState([])
    const [typeFilter, setTypeFilter] = useState("");
    const [dimensionFilter, setDimensionFilter] = useState("");
    const [filteredLocation, setFilteredLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null)

    const [selectedEpisode, setSelectedEpisode] = useState(null)
    const [episode, setEpisode] = useState([])
    const [filteredEpisode, setFilteredEpisode] = useState([]);
    const[numEpisode,setNumEpisode] = useState(12)

    const [favoriteCharacters, setFavoriteCharacters] = useState([]);


    const handleAddFavorite = (character) => {
        const isDuplicate = favoriteCharacters.includes(character)
        if (isDuplicate) {
            setFavoriteCharacters(favoriteCharacters.filter((item) => item !== character))
        } else {
            setFavoriteCharacters([...favoriteCharacters, character])
        }
    }
    const {data: episodeData} = useFetch("https://rickandmortyapi.com/api/episode")

    useEffect(() => {
        if (episodeData) {
            setEpisode(episodeData.results);
        }
    }, [episodeData]);

    useEffect(() => {
        const filtered = episode.filter(
            (item) =>
                (!nameFilter || item.name.toLowerCase().includes(nameFilter.toLowerCase()))
        );
        setFilteredEpisode(filtered);
    }, [episode,nameFilter]);

    const {data: locationData} = useFetch("https://rickandmortyapi.com/api/location")

    const { data } = useFetch("https://rickandmortyapi.com/api/character");

    useEffect(() => {
        if (locationData) {
            setLocation(locationData.results);
        }
    }, [locationData]);
    useEffect(() => {
        const filtered = location.filter(
            (item) =>
                (!typeFilter || item.type === typeFilter) &&
                (!dimensionFilter || item.dimension === dimensionFilter) &&
                (!nameFilter || item.name.toLowerCase().includes(nameFilter.toLowerCase()))
        );
        setFilteredLocation(filtered);
    }, [location,nameFilter,typeFilter,dimensionFilter]);

    useEffect(() => {
        if (data) {
            setCharacters(data.results);
            setFilteredCharacters(data.results);
        }
    }, [data]);

    useEffect(() => {
        const filtered = characters.filter(
            (character) =>
                (!speciesFilter || character.species === speciesFilter) &&
                (!genderFilter || character.gender === genderFilter) &&
                (!statusFilter || character.status === statusFilter) &&
                (!nameFilter || character.name.toLowerCase().includes(nameFilter.toLowerCase()))
        );
        setFilteredCharacters(filtered);
        setNum(8);
    }, [characters, speciesFilter, genderFilter, statusFilter, nameFilter]);

    const handleSpeciesChange = (e) => {
        setSpeciesFilter(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGenderFilter(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleNameSearch = (e) => {
        setNameFilter(e.target.value);
    };

    const handleLoadMore = () => {
        setNum((n) => n + 12);
    };
    const handleCardClick = (character) => {
        setSelectedCharacter(character);
    };
    const handleCardClickLocation =(itemLocation) =>{
        setSelectedLocation(itemLocation)
       console.log(itemLocation,`itemLocation`)
    }
    const handleCardClickEpisode=(itemEpisode) =>{
        setSelectedEpisode(itemEpisode)
        console.log(itemEpisode,`itemLocation`)
    }
    const handleCloseInfo = () => {
        setSelectedCharacter(null);
    };
    const handleCloseInfoLocation = () =>{
        setSelectedLocation(null)
    }
    const handleLoadMoreLocation = () => {
        setNumLocation((n) => n + 8);
    };
    const handleNameSearchLocation = (e) => {
        setNameFilter(e.target.value);
    };
    const handleTypeChange = (e) => {
        setTypeFilter(e.target.value);
    };

    const handleDimensionChange = (e) => {
        setDimensionFilter(e.target.value);
    };
    const handleLoadMoreEpisode = () => {
        setNumEpisode((n) => n + 12);
    };
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Characters
                    filteredCharacters={filteredCharacters}
                    handleStatusChange={handleStatusChange}
                    handleLoadMore={handleLoadMore}
                    handleGenderChange={handleGenderChange}
                    handleNameSearch={handleNameSearch}
                    handleSpeciesChange={handleSpeciesChange}
                    num={num}
                    handleCardClick={handleCardClick}
                    handleAddFavorite={handleAddFavorite}
                    favoriteCharacters={favoriteCharacters}
                />}/>
                <Route path="/characterDetails" element={<CharacterDetails
                selectedCharacter={selectedCharacter}
                handleCloseInfo={handleCloseInfo}
                />}/>
                <Route path='/locationDetails' element={<LocationDetails
                    handleCloseInfoLocation={handleCloseInfoLocation}
                    selectedLocation={selectedLocation}
                />}/>
                <Route path='locations' element={<Locations
                    setFilteredCharacters={setFilteredCharacters}
                    handleDimensionChange={handleDimensionChange}
                    handleLoadMoreLocation={handleLoadMoreLocation}
                    handleNameSearchLocation={handleNameSearchLocation}
                    handleTypeChange={handleTypeChange}
                    numLocation={numLocation}
                    filteredLocation={filteredLocation}
                    handleCardClickLocation={handleCardClickLocation}
                />}/>
                <Route path='episodes' element={<Episodes
                    handleCardClickEpisode={handleCardClickEpisode}
                    filteredEpisode={filteredEpisode}
                    handleNameSearch={handleNameSearch}
                    numEpisode={numEpisode}
                    handleLoadMoreEpisode={handleLoadMoreEpisode}
                />}/>
                <Route path='/episodeDetails' element={<EpisodeDetails
                    selectedEpisode={selectedEpisode}/>}/>
                <Route path='/favorites' element={<Favorite
                    favoriteCharacters={favoriteCharacters}
                    handleAddFavorite={handleAddFavorite}
                />}></Route>
            </Routes>
            <Footer/>
        </div>
    );
};

export default MainComponent;

/*
1 Хуки
2 Промисы
3 ХУКИ
4 Промисы
5 Архитектура проекта
|-- src/
    |-- components/
        |-- common/
    |-- config/
    |-- helpers/
    |-- hooks/
    |-- localisations/
    |-- redux/
        |-- actions/
        |-- reducers/
        |-- store.js
    |-- mobx/
        |-- store
    |-- screens/
    |-- navigations/
    |-- services/
    |-- utils/
    |-- App.js
|-- index.js
|-- package.json
6 children  - what is it ?
7 деструктуризация кода
8 mobx
9 localstorage
*/


/*
https://www.coingecko.com/ru/api/documentation
Реализовать сайт, в котором будет первый экран это регистрация и авторизация,
то есть когда мы нажисаем на регистрацию появляесться экран рег, мы должни рил зарегистрироватся и авторизироватся,
fierbase json localStorage на выбор
модальное окно при нажетии на иконнку бит
фильтр по имени
избранное handleBtn -> график  sell buy
load more
top 100 crip my rait по колонкам Nav
localis.. i18n
styledComp
 */