import React, { useState } from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import NumSvg from '../../assets/svg/numSvg';
import UserSvg from '../../assets/svg/userSvg';
import headerLogo from '../../assets/img/headerLogo.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ModalComponent from "../modal";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className={styles.firstHeader}>
                <div className={styles.imgNum}>
                    <NumSvg style={'white'} />
                    <p>8(986) 713-79-70</p>
                </div>
                <div>
                    <button className={styles.btn} onClick={toggleModal}>ЗАПИСАТЬСЯ НА ПРИЕМ</button>
                </div>
                <div className={styles.searchUser}>
                    <Link to="/login">
                        <UserSvg />
                    </Link>
                </div>
            </div>
            <div className={styles.secondHeader}>
                <Link to="/">
                    <img src={headerLogo} alt="qq" />
                </Link>
                <div>
                    <Link onClick={handleClick}>
                        ОТДЕЛЕНИЕ
                    </Link>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <div className={styles.department}>
                            <MenuItem>Поликлиника</MenuItem>
                            <MenuItem>Стоматология</MenuItem>
                            <MenuItem>Диагностика</MenuItem>
                        </div>
                        <div className={styles.derPos}>
                            <div>
                                <MenuItem onClick={handleClose}><Link to={'/proctology'}>Проктология</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to={'/gynecology'}>Гинекология</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to={'/urology'}>Урология</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to={'/neurology'}>Неврология</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to={'/cardiology'}>Кардиология</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to={'/ophthalmology'}>Офтальмология</Link></MenuItem>
                            </div>
                            <div>
                                <MenuItem onClick={handleClose}><Link to={'/dreamDentistry'}>Стоматология во сне</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to={'/dentalTreatment'}>Лечение зубов под микроскопом</Link></MenuItem>
                            </div>
                            <div>
                                <MenuItem onClick={handleClose}><Link to={'/biopsy'}>Биопсия шейки матки</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to={'/ultraSound'}>УЗИ-диагностика</Link></MenuItem>
                            </div>
                        </div>
                    </Menu>
                </div>
                <Link to="/doc">ВРАЧИ</Link>
                <Link to="/price">ЦЕНЫ</Link>
                <Link to="/laborotory">ЛАБОРАТОРИЯ</Link>
            </div>
            <ModalComponent isModalOpen={isModalOpen} toggleModal={toggleModal}></ModalComponent>
        </>
    );
};

export default Header;
