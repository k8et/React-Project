import React, { FC } from "react";
import styles from "../style.module.css";
import P2P from "../../../assets/svg/ServiceP2P.svg";
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Phone from "../../../assets/svg/ServiceMobile.svg";
import IBAN from "../../../assets/svg/ServicePayments.svg";
import Currency from "../../../assets/svg/ServiceCurrency.svg";
import HeightIcon from "@mui/icons-material/Height";

interface ContainerInputProps {
  card: string;
  setCard: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  iBan: string;
  setIBan: React.Dispatch<React.SetStateAction<string>>;
  currencyFrom: string;
  setCurrencyFrom: React.Dispatch<React.SetStateAction<string>>;
  currencyTo: string;
  setCurrencyTo: React.Dispatch<React.SetStateAction<string>>;
  amount: number | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  currencies: string[];
  t: (key: string) => string;
  convertedAmount: number | undefined;
  handleConversion: () => void;
  theme: "light" | "dark";
}

const ContainerInput: FC<ContainerInputProps> = (props) => {
  const {
    card,
    setCard,
    phone,
    setPhone,
    iBan,
    setIBan,
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    amount,
    setAmount,
    currencies,
    t,
    convertedAmount,
    handleConversion,
    theme,
  } = props;
  return (
    <div className={styles.container}>
      <div
        className={`${styles.box} ${
          theme === "light" ? styles.boxLight : styles.boxDark
        }`}
      >
        <div className={styles.titleBox}>
          <img src={P2P} alt="" />
          <h3>{t("homepage.transferToCard")}</h3>
        </div>
        <div className={styles.inputBox}>
          <TextField
            className={styles.field}
            placeholder="0000 0000 0000 0000"
            type="text"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreditCardIcon sx={{ color: "#c2c2c2" }} />
                </InputAdornment>
              ),
            }}
          />
          <Link to={`/transfer/${card}`} className={styles.link}>
            <button className={styles.button}>
              <ChevronRightIcon sx={{ color: "black" }} />
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`${styles.box} ${
          theme === "light" ? styles.boxLight : styles.boxDark
        }`}
      >
        <div className={styles.titleBox}>
          <img src={Phone} alt="" />
          <h3>{t("homepage.topUpPhone")}</h3>
        </div>
        <div className={styles.inputBox}>
          <TextField
            className={styles.field}
            type="text"
            placeholder="+380 0000000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="standard"
          />
          <Link to={`/top-up-phone/${phone}`} className={styles.link}>
            <button className={styles.button}>
              <ChevronRightIcon sx={{ color: "black" }} />
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`${styles.box} ${
          theme === "light" ? styles.boxLight : styles.boxDark
        }`}
      >
        <div className={styles.titleBox}>
          <img src={IBAN} alt="" />
          <h3>{t("homepage.payment")}</h3>
        </div>
        <div className={styles.inputBox}>
          <TextField
            className={styles.field}
            placeholder={"Введите IBan"}
            type="text"
            value={iBan}
            onChange={(e) => setIBan(e.target.value)}
            variant="standard"
          />
          <Link to={`/requisites/${iBan}`} className={styles.link}>
            <button className={styles.button}>
              <ChevronRightIcon sx={{ color: "black" }} />
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`${styles.boxConverter} ${
          theme === "light" ? styles.boxConverterLight : styles.boxConverterDark
        }`}
      >
        <div className={styles.titleBoxConverter}>
          <img src={Currency} alt="" />
          <h3>{t("homepage.currencyConverter")}</h3>
        </div>
        <div className={styles.inputBoxConverter}>
          <Select
            variant="standard"
            value={currencyFrom || 'USD'}
            onChange={(e) => setCurrencyFrom(e.target.value)}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {t(currency)}
              </MenuItem>
            ))}
          </Select>
          <TextField
            sx={{ width: "300px" }}
            variant="standard"
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(+e.target.value)}
          />
        </div>
        <Button onClick={handleConversion}>
          <HeightIcon />
        </Button>
        <div className={styles.inputBoxConverter}>
          <Select
            variant="standard"
            value={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {t(currency)}
              </MenuItem>
            ))}
          </Select>
          <TextField
            sx={{ width: "300px" }}
            variant="standard"
            disabled
            value={convertedAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default ContainerInput;
