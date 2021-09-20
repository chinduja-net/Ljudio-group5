import React, { useContext } from "react"
import YouTube from "react-youtube"

import { SearchContext } from "../context/SongProvider"

function YoutubePlayer() {
	const {
		currentSong,
		queueSongs,
		shiftQueue,
		setCurrentSong,
		ytPlayerState,
		setYtPlayerState,
	} = useContext(SearchContext)

	const opts = {
		height: "390",
		width: "640",
	}

	function playNextSong(event) {
		// If any songs are queued load the first one's videoId and feed it to the player
		if (queueSongs) {
			let videoId = queueSongs[0].videoId
			event.target.loadVideoById(videoId)
			event.target.playVideo()

			// update the queue in the react context
			setCurrentSong(queueSongs[0])
			shiftQueue()
		}
	}

	// Call this on mount
	function _onReady(event) {
		// Autoplay player on mount
		event.target.playVideo()
	}

	// Autoplay next song in queue if it exists
	function _onEnd(event) {
		queueSongs ? playNextSong(event) : null
	}

	// Calls 2 functions depending on if playingState is true / false.
	// Toggles between playing and pauseing player
	function toggleVidBtn(event) {
		const e = event.target
		console.log("player state", ytPlayerState)
		ytPlayerState === 1
			? e.pauseVideo()
			: ytPlayerState === 2
			? e.playVideo()
			: null
	}

	function _onStateChange(event) {
		let state = event.target.getPlayerState()
		switch (state) {
			case -1:
				setYtPlayerState(-1) // unstarted
				break
			case 0:
				setYtPlayerState(0) // ended
				break
			case 1:
				setYtPlayerState(1) // playing
				break
			case 2:
				setYtPlayerState(2) // paused
				break
			case 3:
				setYtPlayerState(3) // buffering
				break
			case 5:
				setYtPlayerState(5) // video cued
				break
			default:
				return console.log("Unknown yt player state.")
		}

		console.log("CURRENT STATE:", ytPlayerState)
		toggleVidBtn(event)
	}

	return currentSong ? (
		<YouTube
			videoId={currentSong.videoId}
			opts={opts}
			onReady={_onReady}
			onEnd={_onEnd}
			onStateChange={_onStateChange}
		/>
	) : null
}

export default YoutubePlayer
