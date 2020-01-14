import React, { useState } from 'react';
import Modal from './Modal';

export function Name(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [previousElement, setPreviousElement] = useState();
    
    function toggleModal(){
        document.body.classList.toggle('noscroll');
        setPreviousElement(document.activeElement)
        setIsModalVisible(!isModalVisible);
    }

    function removeAsterisk(name){
        if(name.includes('*')){
            return name.substring(0, name.length-1);
        } else {
            return name;
        }
    }

    return(
        <div className="Name">
            {props.story.length > 0 && <button id="expandStory" onClick={toggleModal}><strong>{props.firstName}</strong> ${props.debt.toLocaleString()}</button>}
            
            {props.story.length <= 0 && <div> <strong>{props.firstName}</strong> ${props.debt.toLocaleString()}</div>}
            
            { isModalVisible && (
                <Modal onModalClose={() => {
                    document.body.classList.toggle('noscroll');
                    previousElement.focus();
                    setIsModalVisible(false)
                }}>
                    <Modal.Header>{removeAsterisk(props.firstName)}'s Story</Modal.Header>
                    <Modal.Body>{props.story}</Modal.Body>
                    <Modal.Footer>
                        <Modal.Footer.CloseBtn>Close</Modal.Footer.CloseBtn>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default Name;