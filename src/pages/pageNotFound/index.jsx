import { TbError404 } from "react-icons/tb";
import "./style.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-code">404</div>
      <div className="page-not-found-title">PAGE NOT FOUND</div>
      <div className="page-not-found-text">
        The page you're looking for could not be found.
      </div>
    </div>
  );
};

export default PageNotFound;
