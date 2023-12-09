import { useState } from "react";
import Button from "../customButton";
import Modal from "../modal";
import { shareList } from "../../helpers/api";
import "./style.css";
import CopyToClipboard from "../copyToClipboard";

const ShareModal = ({ show, filter, onClose }) => {
  const [email, setEmail] = useState("");

  const url = `${window.location.href}?filter=${filter}`;
  
  const share = () => {
    shareList(email, url).then(() => onClose());
  };

  return (
    <div className="share-modal-container">
      <Modal show={show} title="Share" onClose={onClose}>
        <Modal.Body>
          <div className="share-modal-body">
            <CopyToClipboard content={url} />
            <div className="input-control">
              <label htmlFor="email">E-mail:</label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => share()} text="Share" />
          <Button onClick={onClose} type="outline" text="Cancel" />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShareModal;
