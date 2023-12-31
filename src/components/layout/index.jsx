import { Outlet } from "react-router-dom";
import "./style.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
