import { useEffect, useRef, forwardRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import LoadingSpinner from "../../assets/img/Spinner.svg";

import "./style.css";
import Loading from "../loading";

const ListItem = forwardRef(({ item }, ref) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/questions/${item.id}`)}
      className="custom-list-item"
      ref={ref}
    >
      <img src={item.thumb_url} alt="list item thumb" />
      <div className="custom-list-question">
        <div className="question-id">{`Question ${item.id}`}</div>
        {item.question}
      </div>
    </button>
  );
});

const CustomList = ({ listItems, onScroll, loading, listEnded }) => {
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading || listEnded) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const lastItem = entries[0];
        if (lastItem.isIntersecting) onScroll();
      });
      if (node) observer.current.observe(node);
    },
    [loading, listEnded]
  );

  return (
    <div className="custom-list-container" id="custom-list">
      {listItems.length == 0 ? (
        <div className="empty-list">
          <FaBoxOpen size={70} />
          <div className="empty-list-message">
            <h3>No Results</h3>
            <span>The list is empty. </span>
          </div>
        </div>
      ) : (
        <>
          {listItems.map((item, index) => {
            if (index + 1 === listItems.length) {
              return (
                <ListItem
                  ref={lastItemRef}
                  key={`${crypto.randomUUID()}-${item.id}`}
                  item={item}
                />
              );
            }
            return (
              <ListItem key={`${crypto.randomUUID()}-${item.id}`} item={item} />
            );
          })}
          {loading && (
            <div className="loading-list-item">
              <Loading size={20} />
            </div>
          )}
          {listEnded && <div className="end-of-list-item">End of results.</div>}
        </>
      )}
    </div>
  );
};

export default CustomList;
