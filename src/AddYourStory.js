import React, {useState} from 'react';


export function AddYourStory(props){
   
    const [nameInput, setNameInput] = useState("");
    const [debtInput, setDebtInput] = useState("");
    const [storyInput, setStoryInput] = useState("");

    function onSubmit(event){
        event.preventDefault();
        console.log(nameInput);
        console.log(debtInput);
        console.log(storyInput);
    }
    
    function cleanDebtInput(event){
        let cleanValue = event.target.value.replace(/\D*/g, '');
        setDebtInput(cleanValue);
    }

    
    return(
    <div className="AddYourStory" onSubmit={onSubmit}> 

        <h3 id="AYSheader">ADD YOUR STORY</h3>

        <div id="AYSname">
            <label htmlFor="name">Name</label>
            <input id="name" value={nameInput} onChange={(event) => setNameInput(event.target.value)}></input>
        </div>
        <div id="AYSdebt">
            <label htmlFor="debt">Student Loan Debt</label>
            <input id="debt" value={debtInput} onChange={cleanDebtInput} maxLength='7' minLength='1'></input>
        </div>
        <div id='AYSstory'>
            <label htmlFor="story">Your Story</label>
            <textarea id="story" value={storyInput} onChange={(event) => setStoryInput(event.target.value)}></textarea>
        </div>
        <button id="AYSsubmit" onClick={onSubmit}>Submit</button>
    </div>
    );
}

export default AddYourStory;