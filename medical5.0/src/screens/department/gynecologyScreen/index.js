import styles from "../../department/style.module.css";
import screenMain from "../../../assets/img/ginecology_img.jpg";
import proctologyImg from "../../../assets/img/gynekolech.jpg";
import {menuItems} from "../../../untils/mock";
import Reviews from "../../../components/reviews";
import {Link} from "react-router-dom";
import ServiceClinicList from "../../../components/serviceAll/serviceClinicList";
import {useDocData} from "../../../untils/hooks/useDocData";



const GynecologyScreen = () => {
    const docs = useDocData()
    return (
        <div className={styles.main}>
        <img className={styles.img} src={screenMain} alt=""/>
        <div className={styles.mainComp}>
            {menuItems.filter(menu => menu.id === 0).map((menu, index) => (<div className={styles.leftSide} key={index}>
                <h3>{menu.title}</h3>
                {menu.items.map((item, index) => (
                    <Link key={index} className={styles.link} to={item.url}><p style={{color: 'black'}}>{item.label}</p>
                    </Link>))}
            </div>))}
            <div className={styles.rightSide}>
                <h1>ГИНЕКОЛОГИЯ</h1>
                <img src={proctologyImg} alt=""/>
                <p>Поскольку за последние годы многие гинекологические заболевания «помолодели», а онкологические
                    болезни начали проявляться на 60% чаще, очень важно регулярно посещать врача-гинеколога.
                    Помните, что правильно диагностировать гинекологические проблемы может только квалифицированный
                    специалист. Регулярное посещение проверенного врача — залог вашего женского здоровья на многие
                    годы.</p>
                <h1>КОГДА НЕОБХОДИМА КОНСУЛЬТАЦИЯ ГИНЕКОЛОГА?</h1>
                <p>Каждая женщина должна раз в полгода проходить плановый осмотр у гинеколога. Это позволит выявить
                    серьезные заболевания на первых стадиях и своевременно начать правильное лечение. Записывайтесь
                    на консультацию к врачу гинекологу для:</p>
                <li>
                    <span>проведения профилактического осмотра;</span>
                </li>
                <li>
                    <span>диагностики и лечения гинекологических заболеваний;</span>
                </li>
                <li>
                    <span>квалифицированного сопровождения беременности и правильного её планирования;</span>
                </li>
                <li>
                    <span>поиска причин бесплодия;</span>
                </li>
                <h1>КАКИЕ СИМПТОМЫ СВИДЕТЕЛЬСТВУЮТ О ТОМ, ЧТО ЖЕНСКИЙ ОРГАНИЗМ НЕ В ПОРЯДКЕ?</h1>
                <p>Своевременная консультация опытного врача-гинеколога поможет вовремя диагностировать опасные
                    заболевания или нарушения в работе организма. Если у вас проявился хотя бы один из нижеописанных
                    симптомов, рекомендуется срочно записаться к профессионалу:</p>
                <li><span>дискомфорт или боль внизу живота</span></li>
                <li><span>кровотечения между менструациями или в период менопаузы;</span></li>
                <li><span>нерегулярный менструальный цикл, обильное кровотечение;</span></li>
                <li><span>болевые ощущения в области половых органов или необычные выделения;</span></li>
                <li><span>боль во время секса;</span></li>
                <h1>ПРЕИМУЩЕСТВА ГИНЕКОЛОГИИ "КЛИНИКО-ДИАГНОСТИЧЕСКОГО ЦЕНТРА"</h1>
                <p>Наша клиника отличается следующими преимуществами:</p>
                <li>
                    <span>отзывчивый, внимательный и опытный персонал;</span>
                </li>
                <li>
                    <span>использование лучшего современного оборудования для диагностики;</span>
                </li>
                <li>
                    <span>специалисты, которые регулярно повышают свою квалификацию за рубежом;</span>
                </li>
                <li>
                    <span>информация о пациентах остается в стенах кабинета и не будет разглашена;</span>
                </li>
                <li>
                    <span>быстрое лечение с положительными результатами.</span>
                </li>
                <p>Кроме того, мы предлагаем приятные цены и гибкую ценовую политику. Помните, что своевременный
                    поход к специалисту поможет избежать многих неприятных заболеваний в будущем!</p>
            </div>
        </div>
        <div className={styles.ourSpec}>
            <h1>
                НАШИ <span>СПЕЦИАЛИСТЫ</span>
            </h1>
            <p>
                <Link className={styles.link} to={'/doc'}>Все специалисты</Link>
            </p>
        </div>
        <div className={styles.cardCon}>
            {docs
                .filter(item => ['2', '15'].includes(item.id))
                .map((item) => (<div className={styles.card} key={item.id}>
                    <img src={item.img} alt="doc"/>
                    <h1>{item.name}</h1>
                    <p>Стаж {item.exp} лет</p>
                    <p>{item.category}</p>
                </div>))}
        </div>
        <ServiceClinicList>
        </ServiceClinicList>
        <Reviews>
        </Reviews>
    </div>);
};

export default GynecologyScreen;