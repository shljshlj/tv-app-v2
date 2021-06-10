import { Link } from 'react-router-dom';
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
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-header__title">{title}</h4>
            <div className="modal-close">
              <Link
                to="#"
                className="modal-close__button"
                onClick={onClose}
              >
                <span className="modal-close__icon">
                  <i className="fas fa-times"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
}

export default Modal;