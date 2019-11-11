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
        <div id="JUQheader">
            <h3>JOIN US</h3>
        </div>
        <div id="JUQemail">
           <label>Email</label>
           <input value={emailInput} onChange={(event) => setEmailInput(event.target.value)}></input>
        </div>
        <div id="JUQzip">
            <label>Zip</label>
            <input value={zipInput} onChange={cleanZipcode} maxLength='5' minLength='5'></input>
        </div>
        <button id="JUQsubmit">Submit</button>
    </div>
    );
}

export default JoinUsQuad;

