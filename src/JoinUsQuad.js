import React, { useState } from 'react';


export function JoinUsQuad(props){
    const [emailInput, setEmailInput] = useState("");
    const [zipInput, setZipInput] = useState("");
    
    function onSubmit(event){
        event.preventDefault();
    }
    
    function cleanZipcode(event){
        let cleanValue = event.target.value.replace(/\D*/g, '');
        setZipInput(cleanValue);
    }

    
    return(
    <div className="JoinUsQuad" onSubmit={onSubmit}> 
        <div id="header">
            <h3>ADD YOUR NAME</h3>
        </div>
        <div id="email">
           <label>Email</label>
           <input value={emailInput} onChange={(event) => setEmailInput(event.target.value)}></input>
        </div>
        <div id="zip">
            <label>Zip</label>
            <input value={zipInput} onChange={cleanZipcode} maxLength='5' minLength='5'></input>
        </div>
        <div id="submit">
            <button onClick={onSubmit} id="submitButton">Submit</button>
        </div>
    </div>
    );
}
export default JoinUsQuad;

