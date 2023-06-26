import { useRef } from "react";
import "./Modal.scss";
function Modal({ children, id }) {
    return (
        <div className={`modal `} id={id}>
            {children}
        </div>
    );
}

export function ModalContent({ children, onClose = () => {} }) {
    const contentRef = useRef(null);
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove("active");
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="modal__content" ref={contentRef}>
            {children}
            <div className="modal__content__close" onClick={closeModal}>
                X
            </div>
        </div>
    );
}

export default Modal;
