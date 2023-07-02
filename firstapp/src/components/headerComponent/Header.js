import React from 'react';
import'./style.css'
import {Link} from 'react-router-dom';
import {headerButtons} from "../../mock/headerButton";



const Header = () => {
    return (
        <div className={'header'}>
            <div className="logo">
                <img src="https://i.ibb.co/RQMm6Tt/Screenshot-3.png" alt="z"/>
                <h1 className={'logoText'}>The Box</h1>
            </div>

            <div className="headerBtnBox">
                {
                    headerButtons.map((item,index)=>{
                        return(
                            <>
                                <Link className={'headerBtn'} to={item.link} key={index}>{item.name}</Link>
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Header;