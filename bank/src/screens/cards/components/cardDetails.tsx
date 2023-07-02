import React, {FC} from "react";
import styles from "../style.module.css";
interface CardDetailsProp{
  t: (key: string) => string,
  userCards: { data: { accountNumber: string, cardNumber: string, currency: string, expirationDate: string, cardType: string } }[],
  currentSlide: number,
  userName:string,
  lastUserName:string,
}

const CardDetails:FC<CardDetailsProp> = (props) => {
  const {t,userCards,currentSlide,userName,lastUserName} = props
  return (
    <div className={styles.cardDetails}>
      <h3>{t("cards.cardDetails")}</h3>
      <div className={styles.conDet}>
        <div className={styles.left}>
          <div>
            <h3>{t("cards.accountNumber")}</h3>
            <p>{userCards[currentSlide]?.data?.accountNumber ?? ""}</p>
          </div>
          <div>
            <h3>{t("cards.cardNumber")}</h3>
            <p>{userCards[currentSlide]?.data?.cardNumber ?? ""}</p>
          </div>
          <div>
            <h3>{t("cards.currency")}</h3>
            <p>{userCards[currentSlide]?.data?.currency ?? ""}</p>
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <h3>{t("cards.cardHolderName")}</h3>
            <p>
              {userCards[currentSlide] ? `${userName} ${lastUserName}` : ""}
            </p>
          </div>
          <div>
            <h3>{t("cards.expirationDate")}</h3>
            <p>{userCards[currentSlide]?.data?.expirationDate ?? ""}</p>
          </div>
          <div>
            <h3>{t("cards.cardType")}</h3>
            <p>{userCards[currentSlide]?.data?.cardType ?? ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;