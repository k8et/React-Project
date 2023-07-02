import React from 'react';
import'./style.css'
import {servicesCard} from "../../mock/ServicesCard";



const Services = () => {
    return (
        <div className={'servicesMain'}>
            <div className={'titleServices'}>
                <h1>Services</h1>
            </div>
            <div className={'containerServices'}>
                    {
                        servicesCard.map((item,index)=>{
                            return <>
                                <div className={"cardService"} key={index}
                                     style={{backgroundColor: item.backgroundColor ? item.backgroundColor : 'white',}}
                                >
                                    <h1 style={{color: item.color ? item.color : 'white'}}>
                                        {item.title}
                                    </h1>
                                    <div  className={'serviceLine'}></div>
                                    {item.svg}
                                </div>
                            </>
                        })
                    }
            </div>
        </div>
    );
};

export default Services;