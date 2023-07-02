import styles from "../../department/style.module.css";
import img from "../../../assets/img/proctologyScreen.png";
import img2 from "../../../assets/img/dreamDenisty.jpg";
import {Link} from "react-router-dom";
import {menuItems} from "../../../untils/mock";
import Reviews from "../../../components/reviews";
import ServiceDentisticsList from "../../../components/serviceAll/serviceDentisticsList";
import {useDocData} from "../../../untils/hooks/useDocData";


const DreamDentistryScreen = () => {
    const docs = useDocData()
    return (
        <div className={styles.main}>
            <img className={styles.img} src={img} alt=""/>
            <div className={styles.mainComp}>
                {menuItems.filter(menu => menu.id === 1).map((menu, index) => (
                    <div className={styles.leftSide} key={index}>
                        <h3>{menu.title}</h3>
                        {menu.items.map((item, index) => (
                            <Link key={index} className={styles.link}  to={item.url}><p style={{ color: 'black' }}>{item.label}</p></Link>
                        ))}
                    </div>
                ))}
                <div className={styles.rightSide}>
                    <h1>ЛЕЧЕНИЕ ЗУБОВ ВО СНЕ</h1>
                    <img src={img2} alt=""/>
                    <p>Для большинства пациентов визит к стоматологу ассоциируется с, как минимум, неприятными ощущениями. Чтобы исключить какой-либо дискомфорт и ненужные переживания у пациента, перед началом лечения зуба его можно седировать – погрузить в медикаментозный сон.

                        Такой подход позволяет не только обезболить все стоматологические манипуляции, но и исключить волнения. переживания и нервозность у пациентов в ходе лечения.</p>
                    <h1>КОМУ ПОДОЙДЕТ ЛЕЧЕНИЕ ЗУБОВ ПОД СЕДАЦИЕЙ?</h1>
                    <p>Стоматология во сне подходит пациентам:</p>
                    <li>
                        <span>испытывающим страх предстоящего лечения (дентофобия);</span>
                    </li>
                    <li>
                        <span>которим требуется большой объем работ;</span>
                    </li>
                    <li>
                        <span>с повышенным рвотным рефлексом;</span>
                    </li>
                    <li>
                        <span>с аллергической реакций на распространенный анестетики для местного обезболивания.</span>
                    </li>
                    <h1>КАК ПОДГОТОВИТЬСЯ К СЕДАЦИИ?</h1>
                    <p>Перед применением седации, чтобы исключить противопоказания, а также подобрать оптимальный препарат и правильно рассчитать его дозировку, врач может назначить пациенту:</p>
                    <li><span>общий и биохимический анализы крови;</span></li>
                    <li><span>анализ крови на свертываемость;</span></li>
                    <li><span>анализ крови на ВИЧ, гепатит В и С;</span></li>
                    <li><span>электрокардиограмму;</span></li>
                    <li><span>консультацию терапевта или педиатра.</span></li>
                    <h1>ПРЕИМУЩЕСТВА СТОМАТОЛОГИИ ВО СНЕ</h1>
                    <p>Современное оборудование, прогрессивные методики обезболивания и высочайшая квалификация врачей стоматологии «КДЦ», позволяют проводить большинство лечебных манипуляций без боли. Но у многих пациентов уже сформирован психологический барьер к посещению врача и здесь на помощь приходит стоматология во сне<br/>
                        <br/>
                        Лечение зубов во сне обеспечит вам:</p>
                    <li>
                        <span>отсутствие боли, вибраций, неприятных запахов и звуков;</span>
                    </li>
                    <li>
                        <span>экономию времени: за один сеанс во сне врач делает намного больший объем работ;</span>
                    </li>
                    <li>
                        <span>легкое и быстрое пробуждение.</span>
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
                    .filter(item => ['1','10','11','12','13','8','9'].includes(item.id))
                    .map((item) => (
                        <div className={styles.card} key={item.id}>
                            <img src={item.img} alt="doc" />
                            <h1>{item.name}</h1>
                            <p>Стаж {item.exp} лет</p>
                            <p>{item.category}</p>
                        </div>
                    ))}
            </div>
            <ServiceDentisticsList>
            </ServiceDentisticsList>
            <Reviews>
            </Reviews>
        </div>
    );
};

export default DreamDentistryScreen;