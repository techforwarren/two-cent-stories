import React, {useState} from 'react';


export function AddYourStory(props){
   
    const [nameInput, setNameInput] = useState("");
    const [debtInput, setDebtInput] = useState("$");
    const [storyInput, setStoryInput] = useState("");

    function onSubmit(event){
        event.preventDefault();
    }
    
    function cleanDebtInput(event){
        let cleanValue = event.target.value.replace(/\D*/g, '');
        setDebtInput(cleanValue);
    }

    
    return(
    <div className="AddYourStory" onSubmit={onSubmit}> 

        <h3 id="AYSheader">ADD YOUR STORY</h3>

        <div id="AYSname">
            <label>Name</label>
            <input value={nameInput} onChange={(event) => setNameInput(event.target.value)}></input>
        </div>
        <div id="AYSdebt">
            <label>Student Loan Debt</label>
            <input value={debtInput} onChange={cleanDebtInput} maxLength='6' minLength='1'></input>
        </div>
        <div id='AYSstory'>
            <label>Your Story</label>
            <textarea></textarea>
        </div>
        <button id="AYSsubmit" onClick={onSubmit}>Submit</button>
    </div>
    );
}

export default AddYourStory;