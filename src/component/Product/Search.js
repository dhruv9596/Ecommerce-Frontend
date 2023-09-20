import React, { Fragment, useState } from "react";
import './search.css';
import { useNavigate } from "react-router-dom";



const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");
  console.log('Keyword Search' , keyword);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  }
  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
