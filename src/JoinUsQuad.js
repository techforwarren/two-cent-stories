import React, { useState } from 'react';

export function JoinUsQuad(props){
    const [emailInput, setEmailInput] = useState("");
    const [zipInput, setZipInput] = useState("");
    
    function onSubmit(event){
        event.preventDefault();
        console.log(emailInput);
        console.log(zipInput);
    }
    
    function cleanZipcode(event){
        let cleanValue = event.target.value.replace(/\D*/g, '');
        setZipInput(cleanValue);
    }

    return(
    <form className="JoinUsQuad" onSubmit={onSubmit}> 
        <h3 id="JUQheader">JOIN US</h3>
        <div id="JUQemail">
           <label htmlFor="email">Email</label>
           <input id="email" value={emailInput} onChange={(event) => setEmailInput(event.target.value)}></input>
        </div>
        <div id="JUQzip">
            <label htmlFor="zip">Zip</label>
            <input id="zip" value={zipInput} onChange={cleanZipcode} maxLength='5' minLength='5'></input>
        </div>
        <button id="JUQsubmit" onClick={onSubmit}>Submit</button>
    </form>
    );
}

export default JoinUsQuad;

