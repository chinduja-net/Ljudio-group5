import React, { useContext } from "react"
import { SearchContext } from "../context/SearchContext"
import SearchBar from "../components/SearchBar"

function SearchResults() {

  const {
    searchResults
  } = useContext(SearchContext)

	return (
		<div id="root">
      <h5>SearchResults.jsx</h5>
      <SearchBar/>

			{searchResults? <div>
				<h2>{searchResults[0].name}</h2>
				<h3>{searchResults[0].artist}</h3>
				<img src={searchResults[0].thumbnails[0].url} alt="" />
			</div> : console.warn("no search results")}
		</div>
	)
}

export default SearchResults
