import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestion, updateQuestion } from "../../helpers/api";
import { formatDate } from "../../helpers/utils";
import { MdShare } from "react-icons/md";
import { useFeedback } from "../../contexts/FeedbackContext";
import Button from "../../components/customButton";
import ShareModal from "../../components/shareModal";
import Modal from "../../components/modal";
import Loading from "../../components/loading";

import "./style.css";

const DetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState({});
  const [confirmVoteVisible, setConfirmVoteVisible] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const { id } = useParams();
  const {setShowMessage, setMessageData} = useFeedback();
  const navigate = useNavigate();

  useEffect(() => {
    getQuestion(id).then((res) => {
      setQuestionData(res);
      setLoading(false);
    });
  }, []);

  const vote = (choice) => {
    setSelectedChoice(choice);
    setConfirmVoteVisible(true);
  };

  const confirmVote = () => {
    const choiceIndex = questionData.choices.findIndex(
      (item) => item.choice === selectedChoice.choice
    );
    questionData.choices[choiceIndex].votes++;
    
    updateQuestion(id, questionData).then((res) => {
      setMessageData({
        title: "Vote Computed",
        text: `Your vote for ${selectedChoice.choice} was successfully computed.`
      })
      setShowMessage(true);
      setSelectedChoice({});
      setConfirmVoteVisible(false);
    });
  };

  return (
    <div className="details-page-container">
      {loading ? (
        <Loading text />
      ) : (
        <>
          <ShareModal
            show={showShareModal}
            onClose={() => setShowShareModal(false)}
            url={window.location.href}
          />
          <Modal
            show={confirmVoteVisible}
            onClose={() => setConfirmVoteVisible(false)}
            title="Confirm Vote"
          >
            <Modal.Body>
              <div className="confirm-vote-content">
                <div className="confirm-vote-question">
                  {questionData.question}
                </div>
                <div className="confirm-vote-message">
                  Do you confirm your vote in{" "}
                  <span>{selectedChoice.choice}</span>?
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button text="Yes" onClick={() => confirmVote()} />
              <Button
                text="No"
                type="outline"
                onClick={() => setConfirmVoteVisible(false)}
              />
            </Modal.Footer>
          </Modal>
          <div className="details-title">
            <h3>Details</h3>
            <Button
              onClick={() => setShowShareModal(true)}
              text="Share"
              icon={<MdShare size={17} />}
              iconPlacement="end"
            />
          </div>
          <div className="details-content">
            <div
              className="details-img"
              style={{ backgroundImage: `url("${questionData.image_url}")` }}
            ></div>
            <div className="details-info">
              <div className="details-question">{questionData.question}</div>
              <div className="details-published">{`Published at ${formatDate(
                questionData.published_at
              )}`}</div>
              <div className="details-choices">
                <h4>Choices</h4>
                <ul>
                  {questionData.choices?.map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="details-choice-info">
                          <div className="details-choice-name">
                            {item.choice}
                          </div>
                          <div className="details-choice-votes">{`${item.votes} votes`}</div>
                        </div>
                        <div className="details-choice-action">
                          <Button text="Vote" onClick={() => vote(item)} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="details-footer">
                  <Button
                    text="Go Back"
                    onClick={() => navigate("/questions")}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
