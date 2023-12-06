import { useEffect } from "react";
import "./style.css";

const ListItem = ({ item }) => {
  return (
    <div className="custom-list-item">
      <img src={item.thumb_url} alt="list item thumb" />
      {item.question}
    </div>
  );
};

const CustomList = ({ listItems }) => {
  return (
    <div className="custom-list-container">
      {listItems.map((item) => {
        return <ListItem item={item} />;
      })}
    </div>
  );
};

export default CustomList;
