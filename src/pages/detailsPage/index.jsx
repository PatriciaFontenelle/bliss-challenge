import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../helpers/api";
import { formatDate } from "../../helpers/utils";

import "./style.css";

const DetailsPage = () => {
  const [questionData, setQuestionData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getQuestion(id).then((res) => setQuestionData(res));
  }, []);

  return (
    <div className="details-page-container">
      <div className="details-title">
        <h3>Details</h3>
      </div>
      <div className="details-content">
        <img src={questionData.image_url} alt="" />
        <div className="details-info">
          <div className="details-question">{questionData.question}</div>
          <div className="details-published">{`Published at ${formatDate(
            questionData.published_at
          )}`}</div>
          <div className="details-choices">
            <h4>Choices</h4>
            <ul>
              {questionData.choices?.map((item) => {
                return (
                  <li>
                    <div className="details-choice-name">{item.choice}</div>
                    <div className="details-choice-votes">{`${item.votes} votes`}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
