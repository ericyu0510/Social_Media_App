import React from "react";

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  const handleSearchInput = () => {
    setSearchKeyword(document.getElementById("searchBar").value);
  };
  return (
    <div className="flex items-center px-4 pt-4 w-4/5 mx-4">
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        data-testid="searchBar"
        placeholder="Search text or title"
        className="flex-1 mr-1 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
      />
      <button
        onClick={handleSearchInput}
        className="flex-none ml-1 w-16 h-8 text-white bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs p-2 text-center "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
