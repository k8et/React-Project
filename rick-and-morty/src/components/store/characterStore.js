import { observable, action } from 'mobx';

class CharacterStore {
    characters = observable([]);

    fetchCharacters = action(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => response.json())
            .then(data => {
                this.characters.replace(data.results);
                console.log('mobx' ,data)
            })
            .catch(error => {
                console.error(error);
            });
    });
}

const store = new CharacterStore();

export default store;
