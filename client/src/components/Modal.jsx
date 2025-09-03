import { createPortal } from "react-dom";

const Modal = ({ children, styles }) => {
  return createPortal(
    <div id={`modal-container ${styles}`}>{children}</div>,
    document.querySelector("#modal")
  );
};

export default Modal;
