import { useEffect, useState } from "react";
import { listQuestions } from "../../helpers/api";
import CustomList from "../../components/customList";

import "./style.css";

const ListPage = () => {
  const [originalList, setOriginalList] = useState([]);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    listQuestions().then((res) => {
      setOriginalList(res);
      setListItems(res);
    });
  }, []);

  return (
    <div className="list-page-container">
      <CustomList listItems={listItems} />
    </div>
  );
};

export default ListPage;
