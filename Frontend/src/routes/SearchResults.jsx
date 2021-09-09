import React, { useContext } from "react"
import { SearchContext } from "../context/SongProvider"
import SearchBar from "../components/SearchBar"
import style from "../styles/SearchResults.module.css"

function SearchResults() {
	const {
		searchResults,
		setCurrentSong,
		setCurrentAlbum,
		setCurrentArtist,
		currentSong,
		currentAlbum,
		currentArtist,
	} = useContext(SearchContext)

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
			<div
				className={style.result_card}
				data-render-song={JSON.stringify({ type, videoId })}
				key={id}
			>
				<p>{type}</p>
				<img
					className={style.result_ThumbnailSquare}
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
			<div
				className={style.result_card}
				data-render-artist={JSON.stringify({ type, browseId })}
				key={id}
			>
				<p>{type}</p>
				<img
					className={style.result_ThumbnailArtist}
					src={thumbnail}
					alt={name + "'s cover thumbnail"}
				/>
				<h3>{name}</h3>
			</div>
		)
	}
	function renderAlbum({ id, type, name, thumbnail, artist, browseId }) {
		return (
			<div
				className={style.result_card}
				data-render-album={JSON.stringify({ type, browseId })}
				key={id}
			>
				<p>{type}</p>
				<img
					className={style.result_ThumbnailSquare}
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

	function resultsClickHandler(e) {
		console.log(e.target.attributes.getNamedItem("data-render-song").value)

		// What the code is SUPPOSED to do
		// If the value from the dataset isnt null
		// we want to save that value and JSON.parse it (since its stringified)
		// and then we want to send and update that value in the context

		if (e.target.attributes.getNamedItem("data-render-song").value !== null) {
			let clickedValueSong = JSON.parse(
				e.target.attributes.getNamedItem("data-render-song").value,
			)
			console.log(clickedValueSong)

			setCurrentSong(clickedValueSong.videoId)
			console.log(JSON.parse(clickedValueSong))
		}

		if (
			e.target.attributes.getNamedItem("data-render-album").value !== null
		) {
			let clickedValueAlbum = JSON.parse(
				e.target.attributes.getNamedItem("data-render-album").value,
			)
			console.log(clickedValueAlbum)

			setCurrentAlbum(clickedValueAlbum.browseId)
			console.log(JSON.parse(clickedValueAlbum))
		}

		if (
			e.target.attributes.getNamedItem("data-render-artist").value !== null
		) {
			let clickedValueArtist = JSON.parse(
				e.target.attributes.getNamedItem("data-render-artist").value,
			)
			console.log(clickedValueArtist)

			setCurrentArtist(clickedValueArtist.browseId)
			console.log(JSON.parse(clickedValueArtist))
		}

		// clickedValue.type === "song"
		// 	? setCurrentSong(clickedValueSong.videoId)
		// 	: clickedValue.type === "album"
		// 	? setCurrentAlbum(clickedValueAlbum.browseId)
		// 	: clickedValue.type === "artist"
		// 	? setCurrentArtist(clickedValueArtist.browseId)
		// 	: null

		console.log(
			"CONTEXT: ",
			currentSong,
			currentAlbum,
			currentArtist,
		)
	}

	return (
		<div id="root">
			<h5>SearchResults.jsx</h5>
			<SearchBar />
			<div className={style.result_container} onClick={resultsClickHandler}>
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
