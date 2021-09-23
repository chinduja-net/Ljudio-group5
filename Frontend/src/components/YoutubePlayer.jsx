import React, { useContext, useEffect } from "react"
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
		ytPlayer,
		setYtPlayer,
	} = useContext(SearchContext)

	useEffect(() => {}, [ytPlayerState, queueSongs])

	const opts = {
		height: "390",
		width: "640",
		playerVars: {
			autoplay: 1,
		},
	}

	// Call this on mount
	function _onReady(event) {
		const player = event.target

		function pauseVid() {
			player.pauseVideo()
		}

		function playVid() {
			player.playVideo()
		}

		// Calls 2 functions depending on if playingState is true / false.
		// Toggles between playing and pausing the player
		function toggleVidBtn() {
			let state = player.getPlayerState()
			console.log("player state", state)

			state === 1
				? pauseVid(ytPlayer)
				: state === 2
				? playVid(ytPlayer)
				: null
		}

		function playNextSong() {
			// If any songs are queued load the first one's videoId and feed it to the player
			if (queueSongs.length) {
				let videoId = queueSongs[0].videoId
				player.loadVideoById(videoId)
				player.playVideo()

				// update the queue in the react context
				setCurrentSong(queueSongs[0])
				shiftQueue()
			} else {
				console.log("queueSongs are nullish")
			}
		}

		// Autoplay player on mount
		setYtPlayer({ event, toggleVidBtn, playNextSong })
		player.playVideo(ytPlayerState)
	}

	// Autoplay next song in queue if it exists
	function _onEnd(event) {
		queueSongs
			? ytPlayer.playNextSong(event, queueSongs, setCurrentSong)
			: null
	}

	function _onStateChange(event) {
		let state = event.target.getPlayerState()
		/**
		 * -1 unstarted
		 * 0 ended
		 * 1 playing
		 * 2 paused
		 * 3 buffering
		 * 5 video cued
		 */
		setYtPlayerState(state) // playing
	// 	switch (state) {
	// 		case -1:
	// 			setYtPlayerState(state)
	// 			break;
		
	// 		default:
	// 			console.warn("");
	// 	}
	}

	return (
		<YouTube
			videoId={currentSong && currentSong.videoId}
			opts={opts}
			onReady={_onReady}
			onEnd={_onEnd}
			onStateChange={_onStateChange}
		/>
	)
}

export default YoutubePlayer
