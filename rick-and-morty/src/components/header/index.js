import React from 'react';
import styles from './style.module.css'
import logo from '../../assets/png/logo.png';
import {Link, NavLink} from "react-router-dom";
import FavoriteSvg from "../../../../bit/src/assets/svg/favoriteSvg";
const Header = () => {
    return (
        <div className={styles.header}>
            <img className={styles.img} src={logo} alt=""/>
            <div className={styles.btnComp}>
                <NavLink className={styles.btn} style={({isActive})=>({color:isActive ? '': 'black'})}  to='/'>
                    <h3>Characters</h3>
                </NavLink>
                <NavLink className={styles.btn} style={({isActive})=>({color:isActive ? '': 'black'})}  to='/locations'>
                    <h3>Locations</h3>
                </NavLink>
                <NavLink className={styles.btn} style={({isActive})=>({color:isActive ? '': 'black'})}   to='/episodes'>
                    <h3>Episodes</h3>
                </NavLink>
                <Link to='/favorites'><h3><FavoriteSvg/></h3></Link>
            </div>
        </div>
    );
};

export default Header;