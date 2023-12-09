import LoadingSpinner from "../../assets/img/Spinner.svg";

import "./style.css";

const Loading = ({ size = 40, text = false }) => {
  return (
    <div className="loading-container">
      <img
        style={{ height: `${size}px` }}
        src={LoadingSpinner}
        alt="loading-spinner"
      />
      {text && <div className="loading-text">Loading</div>}
    </div>
  );
};

export default Loading;
