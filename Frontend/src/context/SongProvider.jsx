import React, { createContext, useState, useEffect } from "react"

export const SearchContext = createContext()

export default function SongProvider(props) {
	const [searchResults, setSearchResults] = useState()
	const [currentSong, setCurrentSong] = useState()
	const [currentAlbum, setCurrentAlbum] = useState()
	const [currentArtist, setCurrentArtist] = useState()
	const [songDetail, setSongDetail] = useState({})
	const [queueSongs, setQueueSongs] = useState([])
	const [ytPlayerState, setYtPlayerState] = useState(-1) // -1 state means unstarted in youtube's api
	const [ytPlayer, setYtPlayer] = useState()
	const [playedSongs, setPlayedSongs] = useState([])
	const [playList, setPlayList] = useState([])
	const [savedQueueAndPlayList, setSavedQueueAndPlayList] = useState([])
	const [freshPlayList, setFreshPlayList] = useState([])
	const [playlistsState, setPlaylistsState] = useState([])

	useEffect(() => {
		getLocalQueued()
	}, [])

	useEffect(() => {
		saveQueToLocal()
	}, [queueSongs])
	// ? next in queue view
	// ? next from: playlist/album view

	// ? next/ previous buttons

	function saveQueToLocal() {
		localStorage.setItem("queued", JSON.stringify(queueSongs))
	}

	function getLocalQueued() {
		if (localStorage.getItem("queued") === null) {
			localStorage.setItem("queued", JSON.stringify([]))
		} else {
			let queuedLocal = JSON.parse(localStorage.getItem("queued"))
			setQueueSongs(queuedLocal)
			setCurrentSong(queuedLocal[0])
		}
	}

	function addObjToArray(newObj) {
		setQueueSongs([...queueSongs, newObj])
	}

	function clearQueueSongs() {
		setQueueSongs([])
	}

	function changeQueueSongs(props) {
		const newArr = queueSongs
		newArr.splice(0, newArr.length, ...props)
		setQueueSongs(newArr)
	}

	function shiftQueue() {
		const newArr = [...queueSongs]
		const shifted = newArr.shift()
		setQueueSongs(newArr)
		setPlayedSongs([...playedSongs, shifted])
		return shifted
	}

	function shiftPlayList() {
		const newArr = [...playList]
		const shifted = newArr.shift()
		setPlayList(newArr)
		setPlayedSongs([...playedSongs, shifted])
		return shifted
	}

	function popPlayedSongs() {
		const newArr = playedSongs
		const popped = newArr.pop()
		setPlayedSongs(newArr)
		return popped
	}

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex

		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--

			// And swap it with the current element.
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}

		return array
	}

	// Returns an array with the values that match the updated version of queueSongs
	// whenever the user wants to un-shuffle the queue
	// TLDR: if the user shuffles, finishes playing a song and then wants the old queue back
	// But without the song they have played already.
	function intersection(arr1, arr2) {
		return arr1.filter((x) => arr2.includes(x))
	}

	function unShuffle() {
		let freshQueueSongs = [...queueSongs]
		let newFreshPlayList = [...freshPlayList]

		let oldQueueSongs = savedQueueAndPlayList[0]
		let oldPlayList = savedQueueAndPlayList[1]

		// compare old state to the (potentially) updated one
		const newQueueSongs = intersection(oldQueueSongs, freshQueueSongs)
		const newPlayList = intersection(oldPlayList, newFreshPlayList)

		setQueueSongs(newQueueSongs)
		localStorage.setItem("queued", JSON.stringify(newQueueSongs))
		setPlayList(newPlayList)
		// localStorage.setItem("playlist", JSON.stringify(newPlayList)) // Add this line whenever the playList gets added to localStorage
		setSavedQueueAndPlayList({})
	}

	function shuffleSongs() {
		if (!savedQueueAndPlayList[0] && !savedQueueAndPlayList[1]) {
			setSavedQueueAndPlayList([queueSongs, playList])

			// ! This doesn't make sure either queueSongs or playList have the correct structure on the data in their objects
			// It won't be a problem unless a user adds their own item to the queueSongs in the localStorage and writes wrong syntax;
			// it's a problem since react tries to render items to the DOM and may not get the data it wants to render.
			const newArr = [...queueSongs, ...playList]
			setQueueSongs(shuffle(newArr))

			// Save a copy of the playlist to use in the un-shuffle method
			setFreshPlayList(playList)
			setPlayList([])
		} else if (savedQueueAndPlayList[0] || savedQueueAndPlayList[1]) {
			// Reset the queue
			unShuffle()
		}
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
				shiftPlayList,
				ytPlayerState,
				setYtPlayerState,
				ytPlayer,
				setYtPlayer,
				setQueueSongs,
				playList,
				setPlayList,
				clearQueueSongs,
				changeQueueSongs,
				popPlayedSongs,
				playedSongs,
				setPlayedSongs,
				shuffleSongs,
				savedQueueAndPlayList,
				setSavedQueueAndPlayList,
				playlistsState,
				setPlaylistsState,
			}}
		>
			{props.children}
		</SearchContext.Provider>
	)
}
