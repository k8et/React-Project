import { makeAutoObservable } from "mobx";

class CurrencyStore {
  rate = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchRate();
  }

  async fetchRate() {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/d124b21f0ba10987b5ad7399/latest/USD"
    );
    const data = await response.json();
    this.rate = data.conversion_rates;
    this.loading = false;
  }
}

export default new CurrencyStore();
