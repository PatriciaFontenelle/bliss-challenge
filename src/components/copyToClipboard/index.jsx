import { useState } from "react";
import { MdContentCopy, MdOutlineCheck } from "react-icons/md";
import "./style.css";

const CopyToClipboard = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
  };

  return (
    <div className="copy-clipboard-container">
      <label htmlFor="copy-to-clipboard">URL:</label>
      <button onClick={() => copy()} className="copy-clipboard-btn">
        <input
          type="text"
          readOnly
          name="copy-to-clipboard"
          id=""
          value={content}
        />
        {copied ? <MdOutlineCheck /> : <MdContentCopy />}
      </button>
    </div>
  );
};

export default CopyToClipboard;
