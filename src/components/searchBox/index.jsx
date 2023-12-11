import { MdOutlineSearch } from "react-icons/md";
import { useEffect, useRef } from "react";
import "./style.css";

const SearchBox = ({ onChange, onFilter, inputValue = "", focused }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  const onKeyUp = (e) => {
    if (e.key === "Enter") onFilter();
  };

  return (
    <div className="search-box-container">
      <input
        ref={inputRef}
        className="search-input"
        placeholder="Search"
        onChange={onChange}
        value={inputValue}
        onKeyUp={(e) => onKeyUp(e)}
      />
      <button onClick={onFilter}>
        <MdOutlineSearch color="#FFF" size={20} />
      </button>
    </div>
  );
};

export default SearchBox;
