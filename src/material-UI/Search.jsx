
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./search.css"

const Search = ({ data, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const filteredData = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filteredData);
  };

  return (
    <div  className="searchBar">
      <input
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="search-icon">Search</button>
    </div>
  );
};

export default Search;
