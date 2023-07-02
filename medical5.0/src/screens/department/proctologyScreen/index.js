import styles from "../../department/style.module.css";
import screenMain from '../../../assets/img/proctologyScreen.png'
import proctologyImg from '../../../assets/img/proctologyImg.png'
import {menuItems} from "../../../untils/mock";
import Reviews from "../../../components/reviews";
import {Link} from "react-router-dom";
import ServiceClinicList from "../../../components/serviceAll/serviceClinicList";
import {useDocData} from "../../../untils/hooks/useDocData";


const ProctologyScreen = () => {
    const docs = useDocData()
    return (
        <div className={styles.main}>
            <img className={styles.img} src={screenMain} alt=""/>
            <div className={styles.mainComp}>
                {menuItems.filter(menu => menu.id === 0).map((menu, index) => (
                    <div className={styles.leftSide} key={index}>
                        <h3>{menu.title}</h3>
                        {menu.items.map((item, index) => (
                            <Link key={index} className={styles.link} to={item.url}><p style={{color: 'black'}}>{item.label}</p>
                            </Link>
                        ))}
                    </div>
                ))}
                <div className={styles.rightSide}>
                    <h1>Проктология</h1>
                    <img src={proctologyImg} alt=""/>
                    <p>«Неудобные проблемы», как часто называют проктологические заболевания в народе, одни из самых
                        распространенных недугов человечества. Тем не менее, большинство пациентов стесняются их, из-за
                        чего затягивают визит к проктологу до момента, когда заболевание прогрессирует, и вызывает боли,
                        которые невозможно терпеть. Однако проктологи напоминают: чем раньше диагностировано заболевание
                        - тем проще его вылечить, не прибегая к операции.</p>
                    <h1>УСЛУГИ ОТДЕЛЕНИЯ ПРОКТОЛОГИИ "КЛИНИКО-ДИАГНОСТИЧЕСКОГО ЦЕНТРА"</h1>
                    <p>В отделении проктологии успешно лечат самые распространенные заболевания заднего прохода и прямой
                        кишки вне зависимости от стадии развитии болезни. Среди них:</p>
                    <li>
                        <span>геморрой;</span>
                    </li>
                    <li>
                        <span>трещины прямой кишки;</span>
                    </li>
                    <li>
                        <span>анальный зуд;</span>
                    </li>
                    <li>
                        <span>киста копчика (лазерное лечение);</span>
                    </li>
                    <h1>КОНСУЛЬТАЦИЯ И ОСМОТР ПРОКТОЛОГА</h1>
                    <p>В проктологическом отделении работают проктологи-мужчины и проктологи-женщины, что позволяет
                        пациенту чувствовать себя на приеме комфортно и уверенно, вне зависимости от пола. Перед
                        посещением проктолога необходима несложная подготовка, суть которой вам объяснят сотрудники
                        колл-центра при записи на первичную консультацию.</p>
                    <h1>ПРИ КАКИХ СИМПТОМАХ НУЖНО ОБРАЩАТЬСЯ К ПРОКТОЛОГУ?</h1>
                    <p></p>
                    <li>
                        <span>хронические запоры;</span>
                    </li>
                    <li>
                        <span>частая диарея;</span>
                    </li>
                    <li>
                        <span>метеоризм;</span>
                    </li>
                    <li>
                        <span>примеси крови или слизи в кале;</span>
                    </li>
                    <li>
                        <span>изменение цвета кала;</span>
                    </li>
                    <li>
                        <span>анальные кровотечения;</span>
                    </li>
                    <li>
                        <span>ложные позывы к дефекации;</span>
                    </li>
                    <li>
                        <span>зуд в области ануса;</span>
                    </li>
                    <li>
                        <span>резкая потеря веса и пр.</span>
                    </li>
                    <p>Перечисленные симптомы могут развиваться при разных заболеваниях. Поставить точный диагноз можно
                        только по результатам обследований. </p>
                    <h1>7 ПРЕИМУЩЕСТВ "КЛИНИКО-ДИАГНАСТИЧЕСКОГО ЦЕНТРА"</h1>
                    <p>Пациенты выбирают клинику из-за ряда преимуществ:</p>
                    <li>
                        <span>опытные врачи-проктологи;</span>
                    </li>
                    <li>
                        <span>наличие в штате женщин-проктологов;</span>
                    </li>
                    <li>
                        <span>отделение дневного стационара;</span>
                    </li>
                    <li>
                        <span>лучшее диагностическое оборудование (видеоректороманоскопия, колоноскопия);</span>
                    </li>
                    <li>
                        <span>возможность консультации у врачей смежных специальностей.</span>
                    </li>
                    <li>
                        <span>возможность сдачи анализов и прохождения необходимых исследований на базе клиники;</span>
                    </li>
                    <li>
                        <span>внимательный и отзывчивый персонал;</span>
                    </li>
                    <p>Записаться на консультацию врача-проктолога вы можете через форму на сайте или по телефону.</p>
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
                    .filter(item => ['20', '4'].includes(item.id))
                    .map((item) => (
                        <div className={styles.card} key={item.id}>
                            <img src={item.img} alt="doc"/>
                            <h1>{item.name}</h1>
                            <p>Стаж {item.exp} лет</p>
                            <p>{item.category}</p>
                        </div>
                    ))}
            </div>
            <ServiceClinicList>
            </ServiceClinicList>
            <Reviews>
            </Reviews>
        </div>
    );
};

export default ProctologyScreen;