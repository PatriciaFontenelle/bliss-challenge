import { useRef, useState } from "react";
import Button from "../customButton";
import Modal from "../modal";
import { shareList } from "../../helpers/api";
import "./style.css";
import CopyToClipboard from "../copyToClipboard";
import { validateEmail } from "../../helpers/utils";
import { useQuestions } from "../../contexts/QuestionsContext";

const ShareModal = ({ show, onClose, url }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setShowMessage, setMessageData } = useQuestions();
  const emailInputRef = useRef();

  const handleValidation = () => {
    if (!email && email === "") {
      setErrorMessage("E-mail is required.");
      return false;
    }

    if (!validateEmail(email)) {
      setErrorMessage("E-mail not valid.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const share = () => {
    const isValid = handleValidation();

    if (!isValid) return;

    shareList(email, url).then(() => {
      onClose();
      setMessageData({
        text: `Link succesfully shared with ${email}.`,
        title: "Shared Link",
      });
      setShowMessage(true);
    });
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
                ref={emailInputRef}
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
              />
              <span className="input-control-error">{errorMessage}</span>
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
