import React, { createContext, useState } from "react"

export const SearchContext = createContext()

export default function SongProvider(props) {
	const [searchResults, setSearchResults] = useState()
	const [currentSong, setCurrentSong] = useState()
	const [currentAlbum, setCurrentAlbum] = useState()
	const [currentArtist, setCurrentArtist] = useState()
	const [songDetail, setSongDetail] = useState({})
	const [queueSongs, setQueueSongs] = useState([])
	// This state handles the highlighting of the icons
  // 0 = Home page, 1 = searchResults, 2 = library
	const [linkTagsValue, setLinkTagsValue] = useState(0)

	// ? next in queue view
	// ? next from: playlist/album view

	// ? next/ previous buttons

	function addObjToArray(newObj) {
		setQueueSongs([...queueSongs, newObj])
	}

	function shiftQueue() {
		const newArr = queueSongs
		newArr.shift()
		setQueueSongs(newArr)
	}

	return (
		<SearchContext.Provider
			value={{
				searchResults,
				setSearchResults,
				currentSong,
				setCurrentSong,
				currentAlbum,
				setCurrentAlbum,
				currentArtist,
				setCurrentArtist,
				songDetail,
				setSongDetail,
				queueSongs,
				addObjToArray,
				shiftQueue,
				linkTagsValue,
				setLinkTagsValue,
			}}
		>
			{props.children}
		</SearchContext.Provider>
	)
}
