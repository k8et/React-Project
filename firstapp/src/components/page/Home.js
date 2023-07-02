import React from 'react';
import MainComponent from "../mainComponent/MainComponent";
import OurReputation from "../ourReputationComponent/OurReputation";
import Services from "../servicesComponent/Services";
import {CardReputation} from "../../mock/cardReputation";
import Input from "../inputComponent/Input";
const Home = () => {
    return (
        <div>
           <MainComponent/>
            <OurReputation dataCard={CardReputation}/>
            <Services/>
            <Input/>
        </div>
    );
};

export default Home;