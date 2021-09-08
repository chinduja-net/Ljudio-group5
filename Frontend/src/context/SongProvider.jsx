import React, { createContext, useState } from "react"

export const SearchContext = createContext()

export default function SongProvider(props) {
	const [searchResults, setSearchResults] = useState()
	const [currentSong, setCurrentSong] = useState("")
	// ? next in queue view
	// ? next from: playlist/album view

	// ? next/ previous buttons

	return (
		<SearchContext.Provider
			value={{
				searchResults,
				setSearchResults,
				currentSong,
				setCurrentSong,
			}}
		>
			{props.children}
		</SearchContext.Provider>
	)
}
