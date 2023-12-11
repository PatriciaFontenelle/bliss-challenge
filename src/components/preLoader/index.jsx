import Loading from "../loading";

import("./style.css");

const PreLoader = () => {
  return (
    <div className="pre-loader-container">
      <Loading text size={60} />
    </div>
  );
};

export default PreLoader;
