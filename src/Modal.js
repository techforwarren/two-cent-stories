import React, { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

const modalContext = createContext();

export default function Modal({ children, onModalClose }) {
    
    return createPortal(
        <div className="modal-container" role="dialog" aria-modal="true">
            <div className="modal-content">
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
              <button className="cross-btn" title="close-modal" onClick={onModalClose}>
                  x
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