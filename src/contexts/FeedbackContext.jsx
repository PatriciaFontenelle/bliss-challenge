import { createContext, useEffect, useState, useContext } from "react";
import NoConnection from "../components/noConnection";
import Message from "../components/message";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({});

  useEffect(() => {
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
    <FeedbackContext.Provider
      value={{
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
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  return { ...context };
};
