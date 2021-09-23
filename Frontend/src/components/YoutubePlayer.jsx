import React, { useContext, useEffect } from "react"
import YouTube from "react-youtube"

import { SearchContext } from "../context/SongProvider"

function YoutubePlayer() {
	const {
		currentSong,
		queueSongs,
		setQueueSongs,
		shiftQueue,
		setCurrentSong,
		ytPlayerState,
		setYtPlayerState,
		ytPlayer,
		setYtPlayer,
	} = useContext(SearchContext)

	useEffect(() => {
		console.log("queueSongs updated.", queueSongs)
	}, [ytPlayerState, queueSongs])

	const opts = {
		height: "100",
		width: "200",
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

			state === 1 ? pauseVid() : state === 2 ? playVid() : null
		}

		setYtPlayer({
			player,
			toggleVidBtn,
		})
	}

	// Autoplay next song in queue if it exists
	function _onEnd(event) {
		// queueSongs
		// 	? ytPlayer.playNextSong(event, queueSongs, setCurrentSong)
		// 	: null
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
	}
	/** 
	function playNextSong() {
		// setQueueSongs(queueSongs)
		// If any songs are queued load the first one's videoId and feed it to the player
		console.log("1 Console log playNextSong in YTplayer.jsx", queueSongs)
		if (queueSongs.length) {
			// let videoId = queueSongs[0].videoId
			let song = shiftQueue()
			console.log("2 Console log playNextSong in YTplayer.jsx", queueSongs)

			ytPlayer.player.loadVideoById(song.videoId)
			// ytPlayer.player.playVideo()
			console.log("3 Console log playNextSong in YTplayer.jsx", queueSongs)

			// update the queue in the react context
			setCurrentSong(song)
			console.log("4 Console log playNextSong in YTplayer.jsx", queueSongs)
		}
		// else {
		// 	console.log("queueSongs are nullish")
		// }
	}
*/
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
