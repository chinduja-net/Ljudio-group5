import React, { useContext } from "react"
import { SearchContext } from "../context/SongProvider"
import SearchBar from "../components/SearchBar"

function SearchResults() {
	const { searchResults } = useContext(SearchContext)

	function renderSong({
		id,
		type,
		name,
		thumbnail,
		artist,
		album,
		duration,
		videoId,
	}) {
		return (
			<div key={id}>
				<img
					className="resultThumbnailSquare"
					src={thumbnail}
					alt={artist + "'s cover thumbnail"}
				/>
				<div>
					<h4>{name}</h4>
					<p>{artist}</p>
				</div>
				<button type="button" className="resultSettingsBtn">
					:{/* Add an icon */}
				</button>
			</div>
		)
	}
	function renderArtist({ id, type, name, thumbnail, browseId }) {
		return (
			<div key={id}>
				<img
					className="resultThumbnailArtist"
					src={thumbnail}
					alt={name + "'s cover thumbnail"}
				/>
				<h3>{name}</h3>
			</div>
		)
	}
	function renderAlbum({ id, type, name, thumbnail, artist, browseId }) {
		return (
			<div key={id}>
				<img
					className="resultThumbnailSquare"
					src={thumbnail}
					alt={artist + "'s cover thumbnail"}
				/>
				<div>
					<h4>{name}</h4>
					<p>{artist}</p>
				</div>
			</div>
		)
	}

	return (
		<div id="root">
			<h5>SearchResults.jsx</h5>
			<SearchBar />
			<div>
				{searchResults // When looping through the search results we can limit the loop with user input
					? searchResults.map((obj) => {
							return obj.type === "song"
								? renderSong(obj)
								: obj.type === "artist"
								? renderArtist(obj)
								: obj.type === "album"
								? renderAlbum(obj)
								: null
					  })
					: null}
			</div>
		</div>
	)
}

export default SearchResults
