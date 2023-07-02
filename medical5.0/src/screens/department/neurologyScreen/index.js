import React, {useEffect, useState} from 'react';
import styles from "../../department/style.module.css";
import screenMain from "../../../assets/img/ginecology_img.jpg";
import {doctorsData, menuItems, servicesDoctor} from "../../../untils/mock";
import {Link} from "react-router-dom";
import proctologyImg from "../../../assets/img/gynekolech.jpg";
import Reviews from "../../../components/reviews";
import {collection, getFirestore, onSnapshot, query} from "firebase/firestore";
import {app} from "../../../config/firebase";
import img from "../../../assets/img/cardiologiya_img 1.jpg";
import ServiceClinicList from "../../../components/serviceAll/serviceClinicList";
const db = getFirestore(app);


const NeurologyScreen = () => {
    const [docs, setDocs] = useState([]);
    const docCollection = collection(db, 'doc');

    useEffect(() => {
        const q = query(docCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDocs(data);
        });
        return () => unsubscribe();
    }, []);
    const doctor = servicesDoctor.find((doctor) => doctor.id === 4);
    return (
        <div className={styles.main}>
            <img className={styles.img} src={screenMain} alt=""/>
            <div className={styles.mainComp}>
                {menuItems.filter(menu => menu.id === 0).map((menu, index) => (
                    <div className={styles.leftSide} key={index}>
                        <h3>{menu.title}</h3>
                        {menu.items.map((item, index) => (
                            <Link className={styles.link}  to={item.url}><p style={{ color: 'black' }}>{item.label}</p></Link>
                        ))}
                    </div>
                ))}
                <div className={styles.rightSide}>
                    <h1>НЕВРОЛОГИЯ</h1>
                    <img src={proctologyImg} alt=""/>
                    <p>Невролог, или невропатолог – это врач, который специализируется на диагностике и лечении заболеваний нервной системы. Его профессия является одной из самых сложных в медицине, так как центральная и периферическая нервные системы контролируют работу практически всех органов. Соответственно, возникновение патологии может сопровождаться разными симптомами, что усложняет диагностику и постановку правильного диагноза. <br/>
                        <br/>
                        В медицинском центре работают высококвалифицированные неврологи с многолетним опытом, а также установлено диагностическое оборудование экспертного класса и созданы все условия для эффективной терапии разных неврологических заболеваний. </p>
                    <h1>ПРИ КАКИХ СИМПТОМАХ НУЖНО ОБРАТИТЬСЯ К ВРАЧУ НЕВРОЛОГУ?</h1>
                    <p>Неврологические нарушения могут вызывать симптомы, характерные для самых разных заболеваний. Не обладая медицинскими знаниями пациентам сложно понять, в чем причина, поэтому многие сперва обращаются к терапевтам, кардиологам, ортопедам и другим специалистам, а к неврологу попадают позже по их направлению.
                        <br/><br/>
                        Консультация невролога рекомендована при следующих симптомах:</p>
                    <li>
                        <span>регулярные головные боли;</span>
                    </li>
                    <li>
                        <span>головокружение;</span>
                    </li>
                    <li>
                        <span>онемение рук или ног;</span>
                    </li>
                    <li>
                        <span>шаткость походки;</span>
                    </li>
                    <li>
                        <span>боли в шее, спине или суставах;</span>
                    </li>
                    <li>
                        <span>тремор;</span>
                    </li>
                    <li>
                        <span>чувство покалывания;</span>
                    </li>
                    <li>
                        <span>нарушение чувствительности;</span>
                    </li>
                    <h1>КАКИЕ ЗАБОЛЕВАНИЯ ЛЕЧИТ НЕВРОЛОГ?</h1>
                    <p>Врачи-неврологи медицинского центра проводят лечение таких заболеваний как:</p>
                    <li><span>мигрень;</span></li>
                    <li><span>неврит;</span></li>
                    <li><span>невралгия;</span></li>
                    <li><span>опоясывающий лишай;</span></li>
                    <li><span>межпозвонковая грыжа;</span></li>
                    <li><span>последствия закрытых черепно-мозговых травм;</span></li>
                    <li><span>расстройства сна;</span></li>
                    <li><span>энцефалопатия;</span></li>
                    <li><span>остеохондроз;</span></li>
                    <p>Специалисты клиники успешно лечат большинство неврологических заболеваний. Главное – своевременно обратиться к хорошему врачу, пройти все необходимые для постановки диагноза обследования и назначенный курс терапии.</p>
                    <h1>ПРЕИМУЩЕСТВА КОНСУЛЬТАЦИИ ВРАЧА НЕВРОЛОГА "КЛИНИКО-ДИАГНАСТИЧЕСКОГО ЦЕНТРА"</h1>
                    <p>При обращении к неврологу в «КЛИНИКО-ДИАГНОСТИЧЕСКОГО ЦЕНТРА» пациент получает возможность пройти диагностику на самой современной аппаратуре, что обеспечивает максимально точные результаты. В неврологии это особенно важно, так как эффективность лечения напрямую зависит от правильной постановки диагноза.

                        Преимущества «КЛИНИКО-ДИАГНОСТИЧЕСКОГО ЦЕНТРА»:</p>
                    <li>
                        <span>опытные неврологи с высшими врачебными категориями;</span>
                    </li>
                    <li>
                        <span>новое диагностическое оборудование экспертного класса;</span>
                    </li>
                    <li>
                        <span>возможность проведения всех обследований в одной клинике;</span>
                    </li>
                    <li>
                        <span>комфортные условия посещения клиники;</span>
                    </li>
                    <li>
                        <span>программа лояльности для постоянных пациентов.</span>
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
                    .filter(item => ['14'].includes(item.id))
                    .map((item, index) => (
                        <div className={styles.card} key={item.id}>
                            <img src={item.img} alt="doc" />
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

export default NeurologyScreen;