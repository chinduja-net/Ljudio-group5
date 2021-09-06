import React, { useRef } from "react"

function SearchBar() {
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
      // TODO: destructure the videoId and duration properties
			if (obj.type === "song" || obj.type === "album") {
				filteredResults.push({
					type: obj.type,
					name: obj.name,
					thumbnails: obj.thumbnails,
					artist: obj.artist,
				})
			}
			if (obj.type === "artist") {
				filteredResults.push({
					type: obj.type,
					name: obj.name,
					thumbnails: obj.thumbnails,
				})
			}
		})
    // Sorts the types after alphabetical order
		filteredResults.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0))
		console.log(filteredResults)
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
