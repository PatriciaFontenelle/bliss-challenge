import { useEffect, useState } from "react";
import { getHealth } from "../../helpers/api";
import PreLoader from "../../components/preLoader";
import RetryActionModal from "../../components/retryActionModal";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = () => {
    setLoading(true);
    getHealth().then((res) => {
        if(res.status === "OK") {
            setLoading(false)
            navigate("/questions")
        } else {
            setShowRetryModal(true);
        }
    })
  }

  const handleRetryAction = () => {
    setShowRetryModal(false);
    checkHealth();
  }

  return (
    <div className="home-container">
      {/* RETRY WIDGET MODAL */}
      <RetryActionModal showModal={showRetryModal} retryAction={() => handleRetryAction()} />

      {loading ? <PreLoader /> : <div className="home">HOME</div>}
    </div>
  );
};

export default Home;
