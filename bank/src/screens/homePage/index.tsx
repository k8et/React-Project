import React, { FC, useEffect, useState } from "react";
import styles from "./style.module.css";
import { observer } from "mobx-react";
import Slider from "react-slick";
import { ComponentProps } from "../../types/ComponentProps";
import ContainerInput from "./components/containerInput";
import dataStore from "../../stores/fetchData";
import { API_URL_NEWS } from "../../utils/API_URL";
import {Currency} from "../../types/CurrencyProp";

interface NewsItem {
  title: string;
  description: string;
  urlToImage: string;
}
interface HomePageProp extends ComponentProps{
  currency: Currency
}

const HomePage: FC<HomePageProp> = observer((props) => {
  const { t, theme, currency } = props;
  const [currencyFrom, setCurrencyFrom] = useState<string>("USD");
  const [currencyTo, setCurrencyTo] = useState<string>("UAH");
  const [amount, setAmount] = useState<number>();
  const [convertedAmount, setConvertedAmount] = useState<number>();
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [iBan, setIBan] = useState("");
  const [news, setNews] = useState<NewsItem[]>([]);
  const currencies = ["USD", "EUR", "UAH", "GBP"];
  useEffect(() => {
    dataStore.fetchData(API_URL_NEWS).then(() => {
      setNews(dataStore.data.articles);
    });
  }, []);

  const handleConversion = () => {
    if (typeof amount === "number") {
      const rateFrom = currency[currencyFrom];
      const rateTo = currency[currencyTo];
      if (rateFrom && rateTo) {
        const conversionRate = rateTo / rateFrom;
        const convertedAmount = amount * conversionRate;
        setConvertedAmount(convertedAmount);
      }
    }
  };


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      className={`${styles.main} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.sliderNews}>
        <Slider {...settings}>
          {news.map((newsItem, index) => (
            <div className={styles.sliderNews} key={index}>
              <div className={styles.news}>
                <div
                  className={`${styles.titleAndDescription} ${
                    theme === "light"
                      ? styles.titleAndDescriptionLight
                      : styles.titleAndDescriptionDark
                  }`}
                >
                  <h3>{newsItem.title}</h3>
                  <p>{newsItem.description}</p>
                </div>
                <img
                  style={{ width: "500px", height: "295px" }}
                  src={newsItem.urlToImage}
                  alt={newsItem.title}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <ContainerInput
        card={card}
        setCard={setCard}
        phone={phone}
        setPhone={setPhone}
        iBan={iBan}
        setIBan={setIBan}
        currencyFrom={currencyFrom}
        setCurrencyFrom={setCurrencyFrom}
        currencyTo={currencyTo}
        setCurrencyTo={setCurrencyTo}
        amount={amount}
        setAmount={setAmount}
        currencies={currencies}
        t={t}
        convertedAmount={convertedAmount}
        handleConversion={handleConversion}
        theme={theme}
      />
    </div>
  );
});

export default HomePage;
