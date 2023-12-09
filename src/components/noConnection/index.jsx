import { TbWifiOff } from "react-icons/tb";

import "./style.css";

const NoConnection = () => {
  return <div className="no-connection-container">
    <TbWifiOff size={80} />
    <div className="no-connection-message">
        No internet connection.
    </div>

  </div>;
};

export default NoConnection;
