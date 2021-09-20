import React, { useContext } from "react"
import YouTube from "react-youtube"

import { SearchContext } from "../context/SongProvider"

function YoutubePlayer() {
	const { currentSong, queueSongs, shiftQueue, setCurrentSong } =
		useContext(SearchContext)

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

	function _onReady(event) {
		// access to player in all event handlers via event.target
		event.target.playVideo()
	}

	function _onEnd(event) {
		// access to player in all event handlers via event.target
		console.log(event.target.i.h.videoId)
		queueSongs ? playNextSong(event) : null
	}

	return currentSong ? (
		<YouTube
			videoId={currentSong.videoId}
			opts={opts}
			onReady={_onReady}
			onEnd={_onEnd}
		/>
	) : null
}

export default YoutubePlayer
