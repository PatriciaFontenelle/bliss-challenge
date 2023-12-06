import React from "react";
import ReactDom from "react-dom";
import "./style.css";

const Modal = ({ children, show, onClose, title, closable = true }) => {
  if (!show) return;

  return ReactDom.createPortal(
    <>
      <div className="modal-bg"></div>
      <div className="modal-container">
        {/* HEADER */}
        {(title || closable) && (
          <>
            <div className="modal-header">
              {title && <div className="modal-title">{title}</div>}
              {closable && (
                <button className="icon-btn" onClick={onClose}>
                  X
                </button>
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
