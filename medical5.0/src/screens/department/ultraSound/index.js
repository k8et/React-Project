import styles from "../style.module.css";
import img from "../../../assets/img/ultra_sound_img.jpg";
import {menuItems} from "../../../untils/mock";
import {Link} from "react-router-dom";
import img2 from "../../../assets/img/ultraSound 2.jpg";
import Reviews from "../../../components/reviews";
import ServiceDiagnosticList from "../../../components/serviceAll/serviceDiagnosticsList";
import {useDocData} from "../../../untils/hooks/useDocData";




const UltraSound = () => {
    const docs = useDocData()
    return (
        <div className={styles.main}>
            <img className={styles.img} src={img} alt=""/>
            <div className={styles.mainComp}>
                {menuItems.filter(menu => menu.id === 1).map((menu, index) => (
                    <div className={styles.leftSide} key={index}>
                        <h3>{menu.title}</h3>
                        {menu.items.map((item) => (
                            <Link className={styles.link} to={item.url}><p style={{color: 'black'}}>{item.label}</p>
                            </Link>
                        ))}
                    </div>
                ))}
                <div className={styles.rightSide}>
                    <h1>УЗИ</h1>
                    <img src={img2} alt=""/>
                    <p>УЗИ – это современный высокоинформативный метод диагностики, который позволяет визуализировать
                        внутренние органы и мягкие ткани. Он применяется в разных областях медицины для выявления
                        заболеваний как у взрослых, так и у детей. </p>
                    <h1>ПРИНЦИП ДЕЙСТВИЯ УЗ-ДИАГНОСТИКИ</h1>
                    <p>Принцип действия УЗИ основан на способности тканей человеческого организма проводить и отражать
                        ультразвуковые волны.
                        <br/> <br/>
                        Во время исследования аппарат излучает УЗ-волны с частотой более 20 кГц. Пройдя по тканям они
                        отражаются и улавливаются специальным датчиком, после чего передаются на компьютер. Он
                        анализирует полученную информацию и формирует изображение, которое появляется на экране
                        монитора.
                        <br/> <br/>
                        Благодаря разной степени проводимости УЗ-волн определенными тканями на изображении проявляются
                        четкие контуры органов. В результате опытный врач может точно определить их расположение, форму,
                        структуру и другие особенности, а также выявить отклонения от нормы. </p>
                    <h1>ПОКАЗАНИЯ ДЛЯ ПРОВЕДЕНИЯ УЗИ</h1>
                    <p>Показаниями к его назначению могут быть заболевания:</p>
                    <li><span>органов брюшной полости (печени, селезенки, желчного пузыря, поджелудочной железы);</span>
                    </li>
                    <li><span>органов малого таза у женщин и мужчин;</span></li>
                    <li><span>дыхательной системы (легких, бронхов);</span></li>
                    <li><span>ЛОР-органов;</span></li>
                    <li><span>сердца.</span></li>
                    <p>УЗИ назначают как при первичной диагностике заболеваний, так и для контроля эффективности
                        лечения, и профилактического обследования пациента. </p>
                    <h3>ПРЕИМУЩЕСТВА УЗИ В КЛИНИКЕ</h3>
                    <p>Преимуществами проведения УЗИ:</p>
                    <li><span>высокое качество оборудования;</span></li>
                    <li><span>детальная и четкая визуализация;</span></li>
                    <li><span>максимальная точность исследований;</span></li>
                    <li><span>доступная цена и программа лояльности для постоянных пациентов. </span></li>
                    <p>Для записи на УЗИ или консультацию доктора звоните в наш контакт-центр.</p>
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
                    .filter(item => ['17', '15'].includes(item.id))
                    .map((item) => (
                        <div className={styles.card} key={item.id}>
                            <img src={item.img} alt="doc"/>
                            <h1>{item.name}</h1>
                            <p>Стаж {item.exp} лет</p>
                            <p>{item.category}</p>
                        </div>
                    ))}
            </div>
            <ServiceDiagnosticList>
            </ServiceDiagnosticList>
            <Reviews>
            </Reviews>
        </div>
    );
};

export default UltraSound;