import Modal from "../modal";
import { AiFillExclamationCircle } from "react-icons/ai";

import "./style.css";

const RetryActionModal = ({ showModal, retryAction }) => {
  return (
    <Modal show={showModal} closable={false}>
      <Modal.Body>
        <div className="retry-modal-container">
          <AiFillExclamationCircle size={70} />
          <div className="retry-modal-text">
            Sorry, we could not complete the request.
          </div>
          <button onClick={retryAction}>Retry</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RetryActionModal;
