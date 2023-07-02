import styles from './style.module.css';
import doctorPhoto from '../../assets/img/doctorPhoto.png'
import NumSvg from "../../assets/svg/numSvg";
import logoFooter from "../../assets/img/logoFooter 9.png";
import masterCard from "../../assets/img/masterCard.png";
import visaCard from "../../assets/img/visaCard.png";
import "react-datepicker/dist/react-datepicker.css";
import Form from "../form";




const Footer = () => {

    return (
        <div>
            <div className={styles.contactScreen}>
                <div className={styles.imgContactPos}>
                    <img src={doctorPhoto} alt="" width="263" height="350"/>
                </div>
                <div className={styles.formContactPos}>
                    <h3>ЗАПИСАТЬСЯ<span> НА ПРИЕМ</span></h3>
                    <Form></Form>
                </div>
                <div className={styles.infoContactPos}>
                    <p>Если вы не нашли нужную информацию — свяжитесь с нами удобным для вас способом</p>
                    <span><NumSvg style={'#3db2f1'}/>8(986) 713-79-70</span>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerContentPos}>
                    <img src={logoFooter} alt="" width="112" height="22"/>
                    <p>Клиника-диагностический центр - это клиника, которая придерживается самых высоких стандартов качества лечения и обслуживания</p>
                    <img src={masterCard} alt=""/>
                    <img src={visaCard} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Footer;