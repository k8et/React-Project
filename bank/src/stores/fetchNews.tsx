import { makeAutoObservable, runInAction } from "mobx"
type NewsItem = {
    title: string;
    urlToImage: string;
    description: string;
};
class NewsStore {
    news: NewsItem[] = [];
    loading = true


    constructor() {
        makeAutoObservable(this)
        this.fetchNews()
    }

    async fetchNews() {
        const response = await fetch('https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=50461044f124421ba203db922539a920')
        const data = await response.json()
        runInAction(() => {
            this.news = data.articles
            this.loading = false
        })
    }
}

export default new NewsStore()
