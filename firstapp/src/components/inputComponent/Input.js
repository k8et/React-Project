import React from 'react'
import'./style.css'
const Input = () => {
    return (
        <div className="inputComponent">
            <div className="inputTitle">
                <h1>What can us do for you?</h1>
            </div>
            <div className="inputText">
                <p>We are ready to work on a project of any complexity,<br /> whether it’s commercial or residential.</p>
            </div>
            <div className="inputNameMail">
                <p><input className="place" placeholder="Your name*" type="text" id="name" /></p>
                <p><input className="place" placeholder="Email*" type="email" id="email" /></p>
            </div>
            <div className="inputReasonPhone">
                <p><input className="place" placeholder="Reason for Contacting*" type="text" id="reason" /></p>
                <p><input className="place" placeholder="Phone" type="number" id="phone" /></p>
            </div>
            <div className="inputMassage">
                <p><textarea planpmholder="Message"></textarea></p>
            </div>
            <div className="indicates">
                <p className="indicatesText">* indicates a required field</p>
            </div>
            <div className="submit">
                <p><input className="buttonSubmit" type="submit" value="Отправить" /></p>
            </div>
        </div>
    );
};

export default Input;