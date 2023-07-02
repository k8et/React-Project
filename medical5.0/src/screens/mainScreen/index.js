import React, {useState} from 'react';
import styles from './style.module.css';
import {Link} from "react-router-dom";
import aboutUsScreen from '../../assets/img/aboutUsScreen.png';
import scrollScreen1 from '../../assets/img/scrollScreen1.png';
import num24 from '../../assets/img/num24.png';
import watch from '../../assets/img/watch.png';
import doc from '../../assets/img/doc.png';
import mon from '../../assets/img/mon.png';
import {menuItems} from "../../untils/mock";
import {useSpring, animated} from "react-spring";
import Chat from "../../components/Chat";
import SupportChat from "../../components/Chat";
import ChatBotComponent from "../../components/Chat";
import AdminSupChat from "../../components/adminSupChat";


const MainScreen = () => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    return (
        <>
            <animated.div style={props} className={styles.container}>
                <div className={styles.scroll} style={{background: `url(${scrollScreen1})`}}>
                    <div className={styles.titlePos}>
                        <div className={styles.title}>
                            <h1>КЛИНИКО-<br/>ДИАГНОСТИЧЕСКИЙ<br/>ЦЕНТР</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.infoScreen}>
                    <div className={styles.cardCon}>
                        <div>
                            <img src={num24} alt="ww"/>
                            <h1>НАШИ КОНТАКТЫ</h1>
                            <p>
                                Вы можете заказать обратный звонок или позвонить <br/>
                                8(986) 713-79-70
                            </p>

                        </div>
                        <div>
                            <img src={watch} alt="ww" style={{marginRight: '5px'}}/>
                            <h1>ВРЕМЯ РАБОТЫ</h1>
                            <p>Мы работаем для вас без выходных и праздников</p>

                        </div>
                        <div>
                            <img src={num24} alt="ww"/>
                            <h1>ОНЛАЙН ЗАПИСЬ</h1>
                            <p>Выберите клинику, введите ваш номер телефона и наши сотрудники call центра свяжутся с
                                вами в самое ближайшее время</p>

                        </div>
                    </div>
                    <div className={styles.titleMedicalPos}>
                        <h1>КЛИНИКО-ДИАГНОСТИЧЕСКИЙ ЦЕНТР</h1>
                    </div>
                    <div className={styles.menuContainer}>
                        <div className={styles.menuConPos}>
                            {menuItems.map((dropdown, index) => (
                                <div className={styles.dropdownWrapper} key={index}>
                                    <button onClick={() => toggleDropdown(index)} className={styles.dropdownBtn}>
                                        {dropdown.title}
                                    </button>
                                    {openDropdownIndex === index && (
                                        <div className={styles.dropdownList}>
                                            {dropdown.items.map((item, i) => (
                                                <button key={i}>
                                                    <Link className={styles.link} to={`${item.url}`}>
                                                        {item.label}
                                                    </Link>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.aboutUsScreen}
                     style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${aboutUsScreen})`}}>
                    <div className={styles.aboutTitlePos}>
                        <h3><span>КЛИНИКО</span>-ДИАГНОСТИЧЕСКИЙ ЦЕНТР</h3>
                        <p>
                            Медицинское оборудование премиум <br/> класса и высокий <br/> европейский стандарт
                            предоставляемых услуг
                        </p>
                    </div>
                    <div className={styles.aboutUsCardPos}>
                        <div>
                            <img src={doc} alt=""/>
                            <h3>ПОЛНЫЙ СПЕКТР МЕДИЦИНСКИХ И ЭСТЕТИЧЕСКИХ УСЛУГ</h3>
                        </div>
                        <div>
                            <img src={mon} alt=""/>
                            <h3>ВЫСОКОТЕХНОЛОГИЧНОЕ ОБОРУДОВАНИЕ В КАЖДОМ ОТДЕЛЕНИИ</h3>
                        </div>
                    </div>
                    <SupportChat></SupportChat>
                </div>
            </animated.div>
        </>
    );
};

export default MainScreen;