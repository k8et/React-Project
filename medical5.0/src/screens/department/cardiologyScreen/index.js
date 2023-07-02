import styles from "../../department/style.module.css";
import img from "../../../assets/img/cardiologiya_img 1.jpg";
import img2 from "../../../assets/img/cardyology img 2.jpg";
import {Link} from "react-router-dom";
import {menuItems} from "../../../untils/mock";
import Reviews from "../../../components/reviews";
import ServiceClinicList from "../../../components/serviceAll/serviceClinicList";
import {useDocData} from "../../../untils/hooks/useDocData";

const CardiologyScreen = () => {
    const docs = useDocData()
    return (
        <div className={styles.main}>
            <img className={styles.img} src={img} alt=""/>
            <div className={styles.mainComp}>
                {menuItems.filter(menu => menu.id === 0).map((menu, index) => (
                    <div className={styles.leftSide} key={index}>
                        <h3>{menu.title}</h3>
                        {menu.items.map((item, index) => (
                            <Link key={index} className={styles.link}  to={item.url}><p style={{ color: 'black' }}>{item.label}</p></Link>
                        ))}
                    </div>
                ))}
                <div className={styles.rightSide}>
                    <h1>КАРДИОЛОГИЯ</h1>
                    <img src={img2} alt=""/>
                    <p>Кардиолог – это врач, который проводит диагностику и лечение всех сердечно-сосудистых заболеваний. В «Клинико-Диагнастическом центре» работают высококвалифицированные специалисты с многолетним стажем работы. Благодаря этому, а также оснащению клиники новым оборудованием ведущих брендов мы предоставляем пациентам медицинскую помощь, соответствующую высшим стандартам качества.  </p>
                    <h1>КОГДА НУЖНА КОНСУЛЬТАЦИЯ КАРДИОЛОГА?</h1>
                    <p>Многие сердечно-сосудистые заболевания развиваются бессимптомно, а потом приводят к развитию серьезных осложнений – инфаркта или инсульта. В результате несвоевременной диагностики в России ежегодно госпитализируют более 50 тыс. пациентов с инфарктом миокарда. При этом 30% больных с острым состоянием врачам не удается спасти.

                        Людям после 40 лет консультацию кардиолога нужно проходить не реже 1 раза в год. Это позволит своевременно выявить заболевание и предотвратить развитие осложнений. Также не стоит затягивать с визитом к доктору, если что-то беспокоит. </p>
                    <li>
                        <span>боль в груди, в области сердца;</span>
                    </li>
                    <li>
                        <span>одышка при незначительных физических нагрузках;</span>
                    </li>
                    <li>
                        <span>постоянная слабость;</span>
                    </li>
                    <li>
                        <span>перебои в работе сердца (изменения ритма, ощущение «остановки» сердца);</span>
                    </li>
                    <h1>ЛЕЧЕНИЕ КАРДИОЛОГИЧЕСКИХ ЗАБОЛЕВАНИЙ</h1>
                    <p>В отделении кардиологии успешно лечат такие заболевания, как:</p>
                    <li><span>атеросклероз;</span></li>
                    <li><span>ишемическая болезнь сердца;</span></li>
                    <li><span>гипертония (артериальная гипертензия);</span></li>
                    <li><span>фибрилляция предсердий;</span></li>
                    <li><span>кардиомиопатии;</span></li>
                    <li><span>миокардит;</span></li>
                    <li><span>пороки сердца;</span></li>
                    <li><span>коронарный синдром;</span></li>
                    <h1>ПРЕИМУЩЕСТВА "КЛИНИКО-ДИАГНАСТИЧЕСКОГО ЦЕНТРА"</h1>
                    <p>Наша клиника отличается следующими преимуществами:</p>
                    <li>
                        <span>квалифицированные кардиологи с многолетним опытом работы;</span>
                    </li>
                    <li>
                        <span>всесторонняя диагностика в стенах одной клиники;</span>
                    </li>
                    <li>
                        <span>оборудование ведущих брендов;</span>
                    </li>
                    <li>
                        <span>терапевтический и хирургический стационар с платами интенсивной терапии;</span>
                    </li>
                    <li>
                        <span>доступные цены;.</span>
                    </li>
                    <p>Кроме того, мы предлагаем приятные цены и гибкую ценовую политику. Помните, что своевременный поход к специалисту поможет избежать многих неприятных заболеваний в будущем!</p>
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
                    .filter(item => ['18','6'].includes(item.id))
                    .map((item) => (
                        <div className={styles.card} key={item.id}>
                            <img src={item.img} alt="doc" />
                            <h1>{item.name}</h1>
                            <p>Стаж {item.exp} лет</p>
                            <p>{item.category}</p>
                        </div>
                    ))}
            </div>
            <ServiceClinicList></ServiceClinicList>
            <Reviews>
            </Reviews>
        </div>
    );
};

export default CardiologyScreen;