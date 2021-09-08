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
					searchResults.map((result) => (
						// const {id, name, artist, type, videoId, thumbnail } = result
						<div key={result.id}>
							<p>{result.videoId}</p>
							<p>{result.type}</p>
							<h2>{result.name}</h2>
							<h3>{result.artist}</h3>
							<img src={result.thumbnail} alt="" />
						</div>
						
					)) : console.warn("Didn't work, sorry")}
				{/* {searchResults ? (
					<div>
						<p>{searchResults[0].videoId}</p>
						<p>{searchResults[0].type}</p>
						<h2>{searchResults[0].name}</h2>
						<h3>{searchResults[0].artist}</h3>
						<img src={searchResults[0].thumbnails[0].url} alt="" />
					</div>
				) : (
					console.warn("nothing found")
				)} */}
				{
					console.log(searchResults)
				}
			</div>
		</div>
	)
}

export default SearchResults
