import React, {useState} from 'react';
import Modal from './Modal';

export function AddYourStory(props){
   
    const [nameInput, setNameInput] = useState("");
    const [debtInput, setDebtInput] = useState("");
    const [storyInput, setStoryInput] = useState("");
    const [emailInput, setEmailInput] = useState("");

    const [validName, setValidName] = useState(false);
    const [validDebt, setValidDebt] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validStory, setValidStory] = useState(true);
    
    const isEnabled = validName && validDebt && validEmail && validStory;

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [storyErrorMessage, setStoryErrorMessage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
        
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify({
            "name":nameInput,
            "debt":Number(debtInput),
            "story":storyInput,
            "email":emailInput
        })
    };

    function toggleModal(){
        document.body.classList.toggle('noscroll');
        setIsModalVisible(!isModalVisible);
    }

    function onSubmit(event){
        event.preventDefault();
        console.log(postOptions);
        // send to db
        fetch(process.env.REACT_APP_API_ENDPOINT, postOptions);

        // show confirmation modal (your story will be posted after ...)
        toggleModal();
    }
    
    function cleanDebtInput(event){
        let cleanValue = event.target.value.replace(/\D*/g, '');
        if(cleanValue > 0){
            setValidDebt(true);
            event.target.classList.remove('error')
        } else {
            setValidDebt(false)
            event.target.classList.add('error');
        }
        setDebtInput(cleanValue);
    }

    
    return(
    <div className="AddYourStory" onSubmit={onSubmit}> 

        <h3 id="AYSheader">ADD YOUR STORY</h3>

        <div id="AYSname">
            <label htmlFor="name">First Name</label>
            <input id="name" value={nameInput} onChange={(event) => {
                if(event.target.value.length > 0){
                    setValidName(true);
                    event.target.classList.remove('error')
                } else {
                    setValidName(false);
                    event.target.classList.add('error')
                }
                setNameInput(event.target.value)
            }}>
            </input>
        </div>
        <div id="AYSdebt">
            <label htmlFor="debt">Student Loan Debt</label>
            <input id="debt" value={debtInput} maxLength='6' onChange={cleanDebtInput} ></input>
        </div>
        <div id='AYSstory'>
            <label htmlFor="story">Your Story</label>
            <span className="errormessage">{storyErrorMessage}</span>
            <textarea id="story" value={storyInput} 
            onChange={(event) => {
                setStoryInput(event.target.value)
                if(event.target.value.length > 2000){
                    setValidStory(false);
                    setStoryErrorMessage("Max length is 2000 characters");
                    event.target.classList.add('error');
                } else {
                    setValidStory(true);
                    setStoryErrorMessage("");
                    event.target.classList.remove('error');
                }
            }} maxLength="2001"></textarea>
        </div>
        <div id='AYSemail'>
            <label htmlFor="email">Email</label>
            <span className="errormessage">{emailErrorMessage}</span>
            <input id="email" value={emailInput} 
            onChange={(event) =>{
                setEmailInput(event.target.value)
                if(event.target.value.includes('@')){
                    setValidEmail(true);
                    setEmailErrorMessage("")
                    event.target.classList.remove('error');
                }
            }}
            onBlur={(event) => {
                    if(event.target.value.includes('@')){
                        setValidEmail(true);
                        setEmailErrorMessage("")
                        event.target.classList.remove('error');
                    } else {
                        setValidEmail(false);
                        setEmailErrorMessage("Enter valid email")
                        event.target.classList.add('error');
                    }
                }}>
            </input>
        </div>
        <button id="AYSsubmit" disabled={!isEnabled} onClick={onSubmit}>Submit</button>

        { isModalVisible && (
            <Modal onModalClose={() => {
                document.body.classList.toggle('noscroll');
                setIsModalVisible(false)
            }}>
                <Modal.Header>Thanks for sharing your story, {nameInput}!</Modal.Header>
                <Modal.Body> 
                Follow the confirmation link in your inbox to add your story to the rest of our two-cent stories.     
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Footer.CloseBtn>Close</Modal.Footer.CloseBtn>
                </Modal.Footer>
            </Modal>
        )}
    </div>
    );
}

export default AddYourStory;