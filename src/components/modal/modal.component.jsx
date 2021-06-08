import './modal.styles.scss';

function Modal({ setShow, show }) {
  if (!show) return null;

  return (
    <div
      className="modal"
      onClick={() => setShow(false)}
    >
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h4>Modal Title</h4>
        </div>
        <div className="modal-body">
          This is modal content
        </div>
        <div className="modal-footer">
          <button className="modal-close-button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;