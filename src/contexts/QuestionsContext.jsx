import { createContext, useEffect, useState, useContext } from "react";
import NoConnection from "../components/noConnection";
import { getHealth } from "../helpers/api";
import Message from "../components/message";
import PreLoader from "../components/preLoader";
import { useLocation } from "react-router-dom";

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const [filter, setFilter] = useState("");
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterParam = searchParams.get("filter");

    setFilter(filterParam);

    window.addEventListener("online", () => {
      setIsConnected(true);
    });

    window.addEventListener("offline", () => {
      setIsConnected(false);
    });

    return function cleanupListener() {
      window.removeEventListener("online", () => {});
      window.removeEventListener("offline", () => {});
    };
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        loading,
        setLoading,
        filter,
        setFilter,
        questionsList,
        setQuestionsList,
        setShowMessage,
        setMessageData,
      }}
    >
      {isConnected ? (
        <div>
          <Message
            show={showMessage}
            onClose={() => {
              setShowMessage(false);
            }}
            title={messageData.title || ""}
            type={messageData.type || undefined}
            duration={messageData.duration || undefined}
            message={messageData.text || ""}
          />
          {children}
        </div>
      ) : (
        <NoConnection />
      )}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  return { ...context };
};
