import React, { createContext, useContext, useEffect, createRef } from 'react';
import { createPortal } from 'react-dom';

const modalContext = createContext();

export default function Modal({ children, onModalClose }) {
    
    useEffect(() => {
        function keyListener(e){
            const listener = keyListenerMap.get(e.keyCode);
            return listener && listener(e);
        }
        document.addEventListener("keydown", keyListener);
        return() => document.removeEventListener("keydown", keyListener);
    })

    const modalRef = createRef();
    const handleTabKey = e => {
        const focusableModalElements = modalRef.current.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableModalElements[0];
        const lastElement = focusableModalElements[focusableModalElements.length -1];

        if(!e.shiftKey && document.activeElement !== firstElement){
            firstElement.focus();
            return e.preventDefault();
        }

        if(e.shiftKey && document.activeElement !== lastElement){
            lastElement.focus();
            e.preventDefault();
        }
    };

    const keyListenerMap = new Map([
        [27, onModalClose],
        [9, handleTabKey]
    ]);

    return createPortal(
        <div className="modal-container" role="dialog" aria-modal="true">
            <div className="modal-content" ref={modalRef}>
                <modalContext.Provider value={{onModalClose}}>
                    {children}
                </modalContext.Provider>
            </div>
        </div>, 
        document.body
    );
  }

  Modal.Header = function ModalHeader(props){
      const { onModalClose } = useContext(modalContext);

      return(
          <div className="modal-header">
              {props.children}
              <button className="cross-btn" title="close modal" onClick={onModalClose}>
                 <span role="img" aria-label="close modal">&#10060;</span>
              </button>
          </div>
      );
  };

  Modal.Body = function ModalBody(props){
      return(
          <div className="modal-body">{props.children}</div>
      );
  };

  Modal.Footer = function ModalFooter(props){
      return(
          <div className="modal-footer">{props.children}</div>
      );
  };

  Modal.Footer.CloseBtn = function CloseBtn(props){
      const { onModalClose } = useContext(modalContext);
      return (
          <button
          {...props}
          className="close-btn"
          title="close modal"
          onClick={onModalClose}
          />
      );
  };