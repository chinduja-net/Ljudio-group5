import React, { useContext } from "react"
import { useHistory } from "react-router-dom"

import { Grid, Button } from "@material-ui/core"

import { SearchContext } from "../context/SongProvider"
import SearchBar from "../components/SearchBar"

function SearchResults() {
	const {
		searchResults,
		setCurrentSong,
		setCurrentAlbum,
		setCurrentArtist,
		currentSong,
		currentAlbum,
		currentArtist,
		setSongDetail,
	} = useContext(SearchContext)

	const history = useHistory()

	function renderSong(object) {
		return (
			<Grid
				data-render-song={JSON.stringify(object)}
				data-render-details={JSON.stringify(object)}
				key={object.id}
			>
				<img
					data-render-song={JSON.stringify(object)}
					src={object.thumbnails[0].url}
					alt={"song thumbnail"}
				/>
				<div data-render-song={JSON.stringify(object)}>
					<h4 data-render-song={JSON.stringify(object)}>{object.name}</h4>
					<p data-render-song={JSON.stringify(object)}>{object.artist}</p>
				</div>
				<Button variant="contained" type="click" onClick={showSongDetails}>
					song details
				</Button>
			</Grid>
		)
	}

	function renderArtist(object) {
		return (
			<Grid data-render-artist={JSON.stringify(object)} key={object.id}>
				<p data-render-artist={JSON.stringify(object)}>{object.type}</p>
				<img
					data-render-artist={JSON.stringify(object)}
					src={object.thumbnails[0].url}
					alt={"artist thumbnail"}
				/>
				<h3 data-render-artist={JSON.stringify(object)}>{object.name}</h3>
			</Grid>
		)
	}
	function renderAlbum(object) {
		return (
			<Grid data-render-album={JSON.stringify(object)} key={object.id}>
				<img
					data-render-album={JSON.stringify(object)}
					src={object.thumbnails[0].url}
					alt={"album cover"}
				/>
				<h4 data-render-album={JSON.stringify(object)}>{object.name}</h4>
				<p data-render-album={JSON.stringify(object)}>{object.artist}</p>
			</Grid>
		)
	}

	//Displays the details of the song in a new page or route
	function showSongDetails(e) {
		if (
			e.currentTarget.parentElement.attributes.getNamedItem(
				"data-render-details",
			) !== null
		) {
			let clickedDetailSong = JSON.parse(
				e.currentTarget.parentElement.attributes.getNamedItem(
					"data-render-details",
				).value,
			)

			setSongDetail(clickedDetailSong)
			history.push("/detailsPage")
		}
	}

	/**
	 * Handles all of the clicks inside of the dynamic DOM and serves the context the relevant data
	 */
	function resultsClickHandler(e) {
		if (e.target.attributes.getNamedItem("data-render-song") !== null) {
			let clickedValueSong = JSON.parse(
				e.target.attributes.getNamedItem("data-render-song").value,
			)

			setCurrentSong(clickedValueSong)
			history.push("/playerPage")
		}

		// Look at the clicked element and determine their types, then update the context with the element's connected data
		// ARTIST
		if (e.target.attributes.getNamedItem("data-render-artist") !== null) {
			let clickedValueArtist = JSON.parse(
				e.target.attributes.getNamedItem("data-render-artist").value,
			)

			setCurrentArtist(clickedValueArtist)
		}

		// Look at the clicked element and determine their types, then update the context with the element's connected data
		// ALBUM
		if (e.target.attributes.getNamedItem("data-render-album") !== null) {
			let clickedValueAlbum = JSON.parse(
				e.target.attributes.getNamedItem("data-render-album").value,
			)

			setCurrentAlbum(clickedValueAlbum)
		}
	}

	return (
		<div id="root">
			<h5>SearchResults</h5>
			<SearchBar />
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				maxwidth="xs"
				style={{
					background: "#FFEED3",
				}}
				onClick={resultsClickHandler}
			>
				{searchResults
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
			</Grid>
		</div>
	)
}

export default SearchResults
