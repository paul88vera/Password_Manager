import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  return createPortal(
    <div id="modal-container">{children}</div>,
    document.querySelector("#modal")
  );
};

export default Modal;
