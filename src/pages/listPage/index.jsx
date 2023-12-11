import { useEffect, useState } from "react";
import { listQuestions } from "../../helpers/api";
import CustomList from "../../components/customList";
import { MdShare } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useQuestions } from "../../contexts/QuestionsContext";
import SearchBox from "../../components/searchBox";
import ShareModal from "../../components/shareModal";
import Button from "../../components/customButton";

import "./style.css";

const ListPage = () => {
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [filterMode, setFilterMode] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchBoxFocused, setSearchBoxFocused] = useState(false);
  const [listEnded, setListEnded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get("filter");

    if (!filter && filter !== null) {
      setSearchBoxFocused(true);
      setFilterMode(true);
    } else if (filter) {
      setSearchStr(filter);
    }
  }, []);

  useEffect(() => {
    setOffset(0);
    setListItems([]);

    if (searchStr !== "") {
      setFilterMode(true);
    } else {
      setFilterMode(false);
    }
  }, [searchStr]);

  useEffect(() => {
    if (listItems.length === 0) {
      getQuestions();
    }
  }, [listItems]);

  const getQuestions = () => {
    setLoading(true);
    const filter = searchStr.toLocaleLowerCase();
    listQuestions(10, offset, filter).then((res) => {
      setListItems((prev) => prev.concat(res));
      setOffset((prev) => prev + 10);
      setLoading(false);
      if (res.length < 10) setListEnded(true);
    });
  };

  return (
    <div className="list-page-container">
      <ShareModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={`${window.location.href}?filter=${searchStr.toLocaleLowerCase()}`}
      />
      <div className="list-page-toolbar">
        <div className="list-page-toolbar-left">
          <SearchBox
            onChange={(e) => setSearchStr(e.target.value)}
            onFilter={() => getQuestions()}
            inputValue={searchStr}
            focused={searchBoxFocused}
          />
          {filterMode && (
            <Button
              className="clear-search-btn-desktop"
              onClick={() => setSearchStr("")}
              text="Clear Search"
              type="link"
            />
          )}
        </div>
        <div className="list-page-toolbar-right">
          {filterMode && (
            <>
              <Button
                className="share-list-btn"
                onClick={() => setShowShareModal(true)}
                text="Share"
                icon={<MdShare size={17} />}
                iconPlacement="end"
              />
              <Button
                className="clear-search-btn-mobile"
                onClick={() => setSearchStr("")}
                text="Clear Search"
                type="link"
              />
            </>
          )}
        </div>
      </div>
      <CustomList
        listItems={listItems}
        onScroll={() => getQuestions()}
        loading={loading}
        listEnded={listEnded}
      />
    </div>
  );
};

export default ListPage;
