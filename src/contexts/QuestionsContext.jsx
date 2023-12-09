import { createContext, useEffect, useState } from "react";
import NoConnection from "../components/noConnection";
import { getHealth } from "../helpers/api";

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [healthOk, setHealthOk] = useState(false);

  useEffect(() => {
    getHealth().then((res) => {
      setHealthOk(res.status === "OK");
      setLoading(false)
    });

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
      value={{ loading, setLoading, questionsList, setQuestionsList }}
    >
      {isConnected ? children : <NoConnection />}
    </QuestionsContext.Provider>
  );
};
