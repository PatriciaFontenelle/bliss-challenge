import { useEffect, useState } from "react";
import { listQuestions } from "../../helpers/api";
import CustomList from "../../components/customList";
import SearchBox from "../../components/searchBox";
import ShareModal from "../../components/shareModal";
import { MdShare } from "react-icons/md";
import { useLocation } from "react-router-dom";

import "./style.css";
import Button from "../../components/customButton";

const ListPage = () => {
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [searchStr, setSearchStr] = useState("");
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
    } else if (filter) {
      setSearchStr(filter);
    }

    getQuestions();
  }, []);

  useEffect(() => {
    console.log("listItems")
    console.log(listItems)
  }, [listItems])

  const getQuestions = () => {
    setLoading(true);
    const filter = searchStr.toLocaleLowerCase();
    listQuestions(10, offset, filter).then((res) => {
      setListItems((prev) => prev.concat(res));
      setOffset((prev) => prev + 10);
      setLoading(false);
      if(res.length < 10) setListEnded(true)
    });
  };

  return (
    <div className="list-page-container">
      <ShareModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
      <div className="list-page-toolbar">
        <div className="list-page-toolbar-right">
          <SearchBox
            onChange={(e) => setSearchStr(e.target.value)}
            onFilter={() => getQuestions()}
            inputValue={searchStr}
            focused={searchBoxFocused}
          />
          {searchStr !== "" && (
            <Button
              onClick={() => setSearchStr("")}
              text="Clear Search"
              type="link"
            />
          )}
        </div>
        <Button
          onClick={() => setShowShareModal(true)}
          text="Share"
          icon={<MdShare size={17} />}
          iconPlacement="end"
          disabled={searchStr === ""}
        />
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
