import React, { useContext } from "react"
import { SearchContext } from "../context/SongProvider"
import SearchBar from "../components/SearchBar"

function SearchResults() {
	const { searchResults } = useContext(SearchContext)

	return (
		<div id="root">
			<h5>SearchResults.jsx</h5>
			<SearchBar />
			<div>
				{searchResults ? // When looping through the search results we can limit the loop with user input
					searchResults.map(({id, videoId, type, name, artist, thumbnail}) => (
						<div key={id}>
							<p>{videoId}</p>
							<p>{type}</p>
							<h2>{name}</h2>
							<h3>{artist}</h3>
							<img src={thumbnail} alt={name + " thumbnail."} />
						</div>
					)) : console.warn("Didn't work, sorry")}
			</div>
		</div>
	)
}

export default SearchResults
