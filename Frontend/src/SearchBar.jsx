import React, { useRef } from "react"

function SearchBar() {
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
		console.log(searchResult)
	}

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					fetchApi()
				}}
			>
				<input
					type="text"
					ref={searchInput}
					placeholder="Search for artists/album/song"
				/>
				<button type="submit">Search</button>
			</form>
		</>
	)
}

export default SearchBar
