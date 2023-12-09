import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";
import Button from "../customButton";
import { MdOutlineClose } from "react-icons/md";

import "./style.css";

const Modal = ({ children, show, onClose, title, closable = true }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    });

    return document.removeEventListener("click", () =>
      console.log("Listener removed.")
    );
  }, [onClose]);

  if (!show) return;

  return ReactDom.createPortal(
    <>
      <div className="modal-bg"></div>
      <div className="modal-container" ref={modalRef}>
        {/* HEADER */}
        {(title || closable) && (
          <>
            <div className="modal-header">
              {title && <div className="modal-title">{title}</div>}
              {closable && (
                <Button
                  onClick={onClose}
                  type="icon"
                  icon={<MdOutlineClose size={20} />}
                />
              )}
            </div>
            <hr />
          </>
        )}

        {/* BODY */}
        {React.Children.map(children, (child) =>
          child.type.name === "Body" ? child : null
        )}

        {/* FOOTER */}
        {React.Children.map(children, (child) =>
          child.type.name === "Footer" ? (
            <>
              <hr />
              {child}
            </>
          ) : null
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

const Body = ({ children }) => <div className="modal-body">{children}</div>;
Modal.Body = Body;

const Footer = ({ children }) => <div className="modal-footer">{children}</div>;
Modal.Footer = Footer;

export default Modal;
