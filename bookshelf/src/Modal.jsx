import { PropTypes } from "prop-types"; 

function Modal({ isVisible, hideModal, children }) {
    if(!isVisible) { return null }
    return (
      <div onClick={hideModal} className="modal_content">
        <div onClick={(e) => e.stopPropagation() } className="modal_btn">
          <button
            onClick={hideModal}
            className="modal_close_btn">
            X
          </button>
          <div className="modal_form">
            {children}
          </div>
        </div>
      </div>
    )
  }
  Modal.propTypes = {
    isVisible: PropTypes.bool,
    hideModal: PropTypes.func,
    children: PropTypes.node,
    };
  export default Modal;