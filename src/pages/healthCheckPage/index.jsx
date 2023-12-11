import { useEffect, useState } from "react";
import { getHealth } from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";
import PreLoader from "../../components/preLoader";
import Button from "../../components/customButton";

import "./style.css";

const RetryComponent = ({ onRetry }) => {
  return (
    <div className="retry-container">
      <AiFillAlert size={80} />
      <div className="retry-title">Ops!</div>
      <div className="retry-text">Seems like we couldn't reach the server.</div>
      <Button text="Try Again" onClick={onRetry} />
    </div>
  );
};

const HealthCheckPage = () => {
  const [loading, setLoading] = useState(true);
  const [showRetry, setShowRetry] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = () => {
    setLoading(true);
    getHealth().then((res) => {
      if (res.status === "OK") {
        setLoading(false);
        navigate("/questions");
      } else {
        setShowRetry(true);
      }
    });
  };

  const handleRetryAction = () => {
    setShowRetry(false);
    checkHealth();
  };

  return (
    <div className="health-check-container">
      {loading ? (
        <PreLoader />
      ) : (
        showRetry && <RetryComponent onRetry={() => handleRetryAction()} />
      )}
    </div>
  );
};

export default HealthCheckPage;
