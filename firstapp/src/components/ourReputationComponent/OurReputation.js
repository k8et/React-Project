import React from 'react';
import'./style.css'
import Operator from "../../assets/svg/Operator";

const OurReputation = (props) => {
    const {dataCard} = props
    return (
        <div className={'ourReputation'}>
            <div className={'reputationPos'}>
                <h1>Our Reputation</h1>
            </div>
            <div className="boxComponent">
                {
                    dataCard.map((item,index)=>{
                        return <>
                            <div className={"card"} key={index}>
                            <Operator />
                            <h1>{item.title}</h1>
                            <p>{item.text}</p>
                            </div>
                            </>
                    })
                }
            </div>
        </div>
    );
};

export default OurReputation;