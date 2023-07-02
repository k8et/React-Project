import React from 'react';
import'./style.css'
import Arrow from "../../assets/svg/Arrow";

const MainComponent = () => {
    return (
        <div className={'mainComponent'}>
            <div className="aSide">
                <h1 className={'buildingThingsText'}>Building things is our mission.</h1>
            </div>
            <div className="bSide">
                <div className="FeatureProjectsBox">
                    <div className={'firstBox'}>
                        <h1 className="boxFirstText1">Feature Projects</h1>
                        <p className="boxFirstText2">The National University of <br/>Architecture</p>
                    </div>
                        <div className={'secondBox'}>
                            <Arrow className={'svgASideBox'}/>
                            <div className={"aSideSecondBox"}>
                                <button className="sideABoxText">Back</button>
                            </div>
                            <div className={"bSideSecondBox"}>
                                <button className="sideBBoxText">Next</button>
                                <Arrow className={'svgBSideBox'} secondIcon/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainComponent;