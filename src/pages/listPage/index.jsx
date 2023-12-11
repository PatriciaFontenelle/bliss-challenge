import { useEffect, useState, useRef } from "react";
import { listQuestions } from "../../helpers/api";
import CustomList from "../../components/customList";
import { MdShare } from "react-icons/md";
import { useLocation, useLoaderData, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const firstUpdate = useRef(true);
  const urlFilter = useLoaderData();

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (searchStr === "") {
      setFilterMode(false);
    } else {
      setFilterMode(true);
    }
    setSearchParams(`filter=${searchStr}`);
  }, [searchStr]);

  useEffect(() => {
    if (firstUpdate.current) {
      if (!urlFilter && urlFilter !== null) {
        setFilterMode(true);
        setSearchBoxFocused(true);
      } else if (urlFilter) {
        setFilterMode(true);
        setSearchStr(urlFilter);
      }
      firstUpdate.current = false;
      return;
    }

    if (!firstUpdate.current && listItems.length === 0) {
      getQuestions();
    }
  }, [listItems]);

  const getQuestions = () => {
    setLoading(true);
    const filter = firstUpdate.current
      ? urlFilter?.toLocaleLowerCase() || ""
      : searchStr.toLocaleLowerCase();
    listQuestions(10, offset, filter).then((res) => {
      setListItems((prev) => prev.concat(res));
      setOffset((prev) => prev + 10);
      setLoading(false);
      if (res.length < 10) setListEnded(true);
    });
  };

  const onFilter = () => {
    setOffset(0);
    setListEnded(false);
    setListItems([]);
  };

  return (
    <div className="list-page-container">
      <ShareModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={window.location.href}
      />
      <div className="list-page-toolbar">
        <div className="list-page-toolbar-left">
          <SearchBox
            onChange={(e) => setSearchStr(e.target.value)}
            onFilter={() => onFilter()}
            inputValue={searchStr}
            focused={searchBoxFocused}
          />
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
                className="clear-search-btn"
                onClick={() => {
                  setSearchStr("");
                  onFilter();
                }}
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

export const questionsLoader = () => {
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("filter");

  return filter;
};
