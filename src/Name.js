import React, { useState } from 'react';
import Modal from './Modal';

export function Name(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
        
    function toggleModal(){
        setIsModalVisible(!isModalVisible);
    }

    return(
        <div className="Name">
            {props.story.length > 0 && <button id="expandStory" onClick={toggleModal}><strong>{props.firstName}</strong> ${props.debt.toLocaleString()}</button>}
            
            {props.story.length <= 0 && <div> <strong>{props.firstName}</strong> ${props.debt.toLocaleString()}</div>}
            
            { isModalVisible && (
                <Modal onModalClose={() => setIsModalVisible(false)}>
                    <Modal.Header>{props.firstName}'s Story</Modal.Header>
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