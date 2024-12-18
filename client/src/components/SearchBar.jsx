import React from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from "../api/axios";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Handling search product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchValue);

    const searchQuery = urlParams.toString();
    // console.log("URLPARAMS", searchQuery);
    const searchTerm = urlParams.get("searchTerm");

    // If search term is empty navigate to homepage
    if (searchTerm === "") {
      navigate("/");
    } else {
      navigate(`/productSearch?${searchQuery}`);
    }
  };

  return (
    <>
      <hr className="search-bar-new-hr" />
      <div className="search-container-new">
        <form
          className="search-bar-new-input"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className=""
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {/* <Link to={`/productSearch`}> */}
          {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
          {/* </Link> */}

          <span className="search-icon" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faSearch} color="white" />
          </span>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
