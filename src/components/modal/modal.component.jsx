import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './modal.styles.scss';

function Modal({ show, onClose, title, children }) {
  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div
        className="modal"
        onClick={onClose}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h4>{title}</h4>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="modal-close-button">Close</button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
}

export default Modal;