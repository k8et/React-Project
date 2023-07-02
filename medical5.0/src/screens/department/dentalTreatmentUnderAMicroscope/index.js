import styles from "../style.module.css";
import img from "../../../assets/img/oftalmologiya_img.jpg";
import {menuItems} from "../../../untils/mock";
import {Link} from "react-router-dom";
import img2 from "../../../assets/img/pod-mikroskopom.jpg";
import Reviews from "../../../components/reviews";
import ServiceDentisticsList from "../../../components/serviceAll/serviceDentisticsList";
import {useDocData} from "../../../untils/hooks/useDocData";


const DentalTreatmentUnderAMicroscope = () => {
    const docs = useDocData()
    return (
        <div className={styles.main}>
            <img className={styles.img} src={img} alt=""/>
            <div className={styles.mainComp}>
                {menuItems.filter(menu => menu.id === 1).map((menu, index) => (
                    <div className={styles.leftSide} key={index}>
                        <h3>{menu.title}</h3>
                        {menu.items.map((item, index) => (
                            <Link key={index} className={styles.link} to={item.url}><p style={{color: 'black'}}>{item.label}</p>
                            </Link>
                        ))}
                    </div>
                ))}
                <div className={styles.rightSide}>
                    <h1>ЛЕЧЕНИЕ ЗУБОВ ПОД МИКРОСКОПОМ</h1>
                    <img src={img2} alt=""/>
                    <p>Использование дентального микроскопа – это инновация, которая вывела стоматологию на новый
                        уровень. Аппарат обеспечивает многократное увеличение и позволяет врачу видеть то, что не
                        заметно невооруженным глазом. В результате лечение становится еще более точным и
                        качественным.</p>
                    <h1>КОГДА ИСПОЛЬЗУЮТ ДЕНТАЛЬНЫЙ МИКРОСКОП?</h1>
                    <p>Дентальный микроскоп применяют в нескольких областях стоматологии, в частности в терапии,
                        эндодонтии, ортопедии и эстетической стоматологии. Увеличение в 30-40 раз позволяет заметить
                        ранний кариес и небольшие трещины на зубе, тщательно проработать зубные каналы, бережно обточить
                        зуб под коронку или винир и обеспечить максимально плотное прилегание к зубу во время установки.
                        <br/> <br/>
                        Микроскоп используют для:</p>
                    <li>
                        <span>диагностики зубов – выявления раннего кариеса, сколов и микротрещин;</span>
                    </li>
                    <li>
                        <span>лечения и пломбирования каналов зуба</span>
                    </li>
                    <li>
                        <span>лечения корней зуба;</span>
                    </li>
                    <li>
                        <span>герметизации фиссур;</span>
                    </li>
                    <li>
                        <span>реставрации зубов;</span>
                    </li>
                    <li>
                        <span>установки виниров;</span>
                    </li>
                    <li>
                        <span>удаление гранулем, кист зуба.</span>
                    </li>
                    <h1>ДИАГНОСТИКА ЗУБОВ ПОД МИКРОСКОПОМ</h1>
                    <p>Дентальный микроскоп обеспечивает увеличение осматриваемой зоны, благодаря чему стоматолог может
                        детально изучить каждый зуб и обнаружить даже самые мелкие повреждения. Часто так выявляют
                        кариес на стадии пятна, когда происходит первичное разрушение эмали, а также скрытый кариес,
                        расположенный между зубами и в других труднодоступных местах. Также в микроскоп видны дефекты
                        пломб, микротрещины, перфорации и переломы корня зуба.</p>
                    <h3>ПРЕИМУЩЕСТВА ЛЕЧЕНИЯ ЗУБОВ ПОД МИКРОСКОПОМ </h3>
                    <p>Преимущества лечения зубов под микроскопом:</p>
                    <li><span>высокое качество лечения – увеличение позволяет стоматологу повысить точность всех манипуляций;</span>
                    </li>
                    <li><span>безопасность – минимизируется повреждение здоровые тканей зуба и десны;</span></li>
                    <li><span>точность – обеспечивает максимальное плотное крепление виниров и коронок;</span></li>
                    <li><span>надежность – уменьшается риск осложнений и прогрессирования кариеса за счет ранней диагностики и качественного лечения. </span>
                    </li>
                    <p>Использование дентального микроскопа повышает качество большинства стоматологических процедур.
                        Узнать больше о его применении, а также получить первичную консультацию стоматолога вы можете,
                        записавшись на консультацию.
                        <br/> <br/>
                        Звоните в наш контакт-центр или пишите в чат на сайте.</p>
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
                    .filter(item => ['1', '10', '11', '12', '13', '8', '9'].includes(item.id))
                    .map((item) => (
                        <div className={styles.card} key={item.id}>
                            <img src={item.img} alt="doc"/>
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

export default DentalTreatmentUnderAMicroscope
;