import ReactDom from "react-dom";
import { MdErrorOutline, MdOutlineCheckCircleOutline } from "react-icons/md";
import { TiWarningOutline } from "react-icons/ti";
import "./style.css";
import { useEffect } from "react";

const Message = ({
  show,
  duration = 5000,
  type = "success",
  message,
  title,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        onClose();
      }, duration);
    }
  }, [show]);

  const styles = {
    error: {
      style: {
        backgroundColor: "#eda8a8",
        color: "red",
      },
      icon: <MdErrorOutline />,
    },
    warning: {
      style: {
        backgroundColor: "#edd7a8",
        color: "#f7a900",
      },
      icon: <TiWarningOutline />,
    },
    success: {
      style: {
        backgroundColor: "#9dfca5",
        color: "#02780c",
      },
      icon: <MdOutlineCheckCircleOutline size={25} />,
    },
  };

  if (!show) return;

  return ReactDom.createPortal(
    <div style={styles[type].style} className="message-container">
      {styles[type].icon}
      <div className="message-content">
        <div className="message-title">{title}</div>
        <div className="message-text">{message}</div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Message;
