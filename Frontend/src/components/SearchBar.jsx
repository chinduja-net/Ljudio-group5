import React, { useRef, useContext } from "react"
import { Redirect } from "react-router"
import { useLocation as RouterLink } from "react-router-dom"
import {nanoid} from "nanoid"

import { SearchContext } from "../context/SongProvider"

function SearchBar() {
	const { setSearchResults } = useContext(SearchContext)
	// const location = useLocation()

	/**
	 * Looks at the current value in the input field and
	 * update the value so that we can use it further up in the code
	 */
	let searchInput = useRef(null)

	async function fetchApi() {
		const response = await fetch(
			`https://yt-music-api.herokuapp.com/api/yt/search/${searchInput.current.value}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		)
		const searchResult = await response.json()

		console.log(searchResult.content)

		let filteredResults = []

		searchResult.content.forEach((obj) => {
			// Destructure the searchResult to get our desired properties we want to use
			if (obj.type === "song") {
				filteredResults.push({
					id: nanoid(),
					type: obj.type,
					name: obj.name,
					thumbnail: obj.thumbnails[0].url,
					artist: obj.artist,
					album: obj.album,
					duration: obj.duration, 
					videoId: obj.videoId,
				})
			}
			if (obj.type === "album") {
				filteredResults.push({
					id: nanoid(),
					type: obj.type,
					name: obj.name,
					thumbnail: obj.thumbnails[0].url,
					artist: obj.artist,
					browseId: obj.browseId,
				})
			}
			if (obj.type === "artist") {
				filteredResults.push({
					id: nanoid(),
					type: obj.type,
					name: obj.name,
					thumbnail: obj.thumbnails[0].url,
					browseId: obj.browseId,
				})
			}
		})
		// Sorts the types after alphabetical order
		filteredResults.sort((a, b) =>
			a.type > b.type ? 1 : b.type > a.type ? -1 : 0,
		)
		console.log(filteredResults)
		// update the searchResults context
		setSearchResults(filteredResults)

		// TODO: Try if this works after the home page has been created.
		// if(location.pathname === "/") {
		// 	<Redirect to="/searchResults"/>
		// }
	}

	return (
		<>
			<form
				onSubmit={(e) => {
					// Todo: something
					e.preventDefault()
					fetchApi()
				}}
			>
				<input
					type="text"
					// Saves a reference for the target element so that it can be used globally in the component
					ref={searchInput}
					placeholder="Search for artists/album/song"
				/>
				<button type="submit">Search</button>
			</form>
		</>
	)
}

export default SearchBar
