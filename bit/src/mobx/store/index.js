import { makeObservable, observable, action } from "mobx";

class CoinGeckoAPI {
    userBalance = 1110000;
    userPortfolio = {};
    searchQuery = '';
    cryptoData = [];
    favorites = [];
    pending = false;
    constructor() {

        makeObservable(this, {
            cryptoData: observable,
            favorites: observable,
            fetchData: action,
            toggleFavorite: action,
            searchQuery: observable,
            setSearchQuery: action,
            searchCoins: action,
        });
    }
    buyCoin(coinId, amount) {
        const coin = this.cryptoData.find((coin) => coin.id === coinId);
        const cost = coin.current_price * amount;

        if (this.userBalance >= cost) {
            this.userBalance -= cost;
            this.userPortfolio[coinId] = (this.userPortfolio[coinId] || 0) + amount;
        } else {
            throw new Error("Недостаточно средств для покупки");
        }
    }
    sellCoin(coinId, amount) {
        const coin = this.cryptoData.find((coin) => coin.id === coinId);
        const value = coin.current_price * amount;

        if (this.userPortfolio[coinId] && this.userPortfolio[coinId] >= amount) {
            this.userBalance += value;
            this.userPortfolio[coinId] -= amount;
            if (this.userPortfolio[coinId] === 0) {
                delete this.userPortfolio[coinId];
            }
        } else {
            throw new Error("Недостаточно монет для продажи");
        }
    }
    setSearchQuery(query) {
        this.searchQuery = query;
    }
    searchCoins() {
        if (!this.searchQuery) {
            return this.cryptoData;
        }
        return this.cryptoData.filter(coin =>
            coin.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    fetchData() {
        this.pending = true;
        fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=138&page=1&sparkline=false"
        )
            .then(response => response.json())
            .then(data => {
                this.cryptoData = data;
                console.log('data', data);
                this.pending = false;
            })
            .catch(error => {
                console.error(error);
            });
        this.pending = false;
    }


    toggleFavorite(id) {
        const index = this.favorites.indexOf(id);
        if (index === -1) {
            this.favorites.push(id);
        } else {
            this.favorites.splice(index, 1);
        }
    }
}

const coinGeckoAPI = new CoinGeckoAPI();

export default coinGeckoAPI;