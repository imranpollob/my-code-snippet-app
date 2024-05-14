import React from "react";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="close" onClick={onClose}>&times;</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
