import React, { useState } from "react";

export default function Search(props: any) {
  const [inputValue, setInputValue] = useState("");
  // const [searchResult, setSearchResult] = useState("");

  function searchMovie() {
    props.search(inputValue);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={searchMovie}>Sök</button>
    </div>
  );
}
