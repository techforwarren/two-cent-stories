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

    const isEnabled = validName && validDebt && validEmail;

    const [isModalVisible, setIsModalVisible] = useState(false);
        
    function toggleModal(){
        document.body.classList.toggle('noscroll');
        setIsModalVisible(!isModalVisible);
    }

    function onSubmit(event){
        event.preventDefault();

        // send to db

        // show confirmation modal (your story will be posted after ...)
        toggleModal();
        console.log(nameInput);
        console.log(debtInput);
        console.log(storyInput);
        console.log(emailInput)
    }
    
    function cleanDebtInput(event){
        let cleanValue = event.target.value.replace(/\D*/g, '');
        if(cleanValue.length > 0){
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
            <label htmlFor="name">Name</label>
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
            <textarea id="story" value={storyInput} onChange={(event) => setStoryInput(event.target.value)}></textarea>
        </div>
        <div id='AYSemail'>
            <label htmlFor="email">Email</label>
            <input id="email" value={emailInput} onChange={(event) => {
                    setEmailInput(event.target.value)
                    if(event.target.value.includes('@')){
                        setValidEmail(true);
                        event.target.classList.remove('error');
                    } else {
                        setValidEmail(false);
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
                <Modal.Header>Thanks, {nameInput}!</Modal.Header>
                <Modal.Body> 
                    you'll receive an email ...</Modal.Body>
                <Modal.Footer>
                    <Modal.Footer.CloseBtn>Close</Modal.Footer.CloseBtn>
                </Modal.Footer>
            </Modal>
        )}
    </div>
    );
}

export default AddYourStory;