import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { SearchContext } from "../context/SongProvider"
import ProgressBar from "../components/ProgressBar"

import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import { AppBar, Toolbar } from "@mui/material"
import ListIcon from "@mui/icons-material/List"

function PlayerPage() {
	const history = useHistory()
	const {
		currentSong,
		queueSongs,
		shiftQueue,
		setCurrentSong,
		ytPlayerState,
		ytPlayer,
	} = useContext(SearchContext)

	const [audioState, setAudioState] = useState(true)

	function playNextSong() {
		// If any songs are queued load the first one's videoId and feed it to the player
		if (queueSongs.length) {
			// Get first song from queue and update the queue
			let song = shiftQueue()

			ytPlayer.player.loadVideoById(song.videoId)
			ytPlayer.player.playVideo()
			setCurrentSong(song)
		}
	}

	function muteAudio() {
		ytPlayer.player.mute()
		setAudioState(false)
	}

	function unmuteAudio() {
		ytPlayer.player.unMute()
		setAudioState(true)
	}

	function toggleAudio() {
		audioState ? muteAudio() : unmuteAudio()
		console.log("audio state", audioState)
	}

	// Only renders the miniplayer if a currentSong is in the player
	return currentSong ? (
		<div style={{ width: "200px", height: "200px" }}>
			<img
				src={currentSong.thumbnails[1].url}
				alt="Song tumbnail"
				style={{
					width: "120px",
					height: "120px",
					borderRadius: "50%",
				}}
			/>
			<div>
				<div>
					<h1>{currentSong.name}</h1>
					<h2>{currentSong.artist.name}</h2>
				</div>
				{/* Go to details page button */}
			</div>

			<ProgressBar />

			<div>
				<button onClick={toggleAudio}>
					{audioState ? <VolumeUpIcon /> : <VolumeOffIcon />}
				</button>

				<button>
					<SkipPreviousIcon />
				</button>

				<button onClick={() => ytPlayer.toggleVidBtn()}>
					{/* 
					Toggle play button icon based on player state
					1 = playing, 2 = paused
				*/}
					{ytPlayerState === 1 ? (
						<PauseIcon />
					) : ytPlayerState === 2 ? (
						<PlayArrowIcon />
					) : (
						<PlayArrowIcon />
					)}
				</button>

				<button onClick={() => playNextSong()}>
					<SkipNextIcon />
				</button>

				<button
					onClick={() => {
						history.push("/queueViewer")
					}}
				>
					<ListIcon />
				</button>
			</div>
		</div>
	) : (
		<div>
			<h3>No song selected, go back and search for a song!</h3>
			<button onClick={() => history.push("/")}>Home page</button>
		</div>
	)
}

export default PlayerPage
