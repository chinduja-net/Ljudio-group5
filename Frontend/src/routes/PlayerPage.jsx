import React, { useRef, useContext, useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import Player from "../components/Player"
import { SearchContext } from "../context/SongProvider"

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
	const location = useLocation()
	const {
		currentSong,
		queueSongs,
		shiftQueue,
		setCurrentSong,
		ytPlayerState,
		ytPlayer,
	} = useContext(SearchContext)

	useEffect(() => {}, [queueSongs])

	// 2 states, 1 checking for if its playing or paused and the other checks for audio / no audio
	const [playingState, setPlayingState] = useState(true)
	const [audioState, setAudioState] = useState(true)

	// function playNextSong() {
	// 	// Plays next song from queueSongs
	// 	console.log("log of queued songs inside playNext func", queueSongs)
	// 	if (queueSongs[0]) {
	// 		let videoId = queueSongs[0].videoId
	// 		player.current.loadVideoById(videoId)
	// 		player.current.playVideo()
	// 		setPlayingState(true)
	// 		// updates
	// 		setCurrentSong(queueSongs[0])
	// 		shiftQueue()
	// 	}
	// }

	// function pauseVid() {
	// 	player.current.pauseVideo()
	// 	setPlayingState(false)
	// }

	// function playVid() {
	// 	player.current.playVideo()
	// 	setPlayingState(true)
	// }

	function muteAudio() {
		ytPlayer.player.current.mute()
		setAudioState(false)
	}

	function unmuteAudio() {
		ytPlayer.player.current.unMute()
		setAudioState(true)
	}

	function toggleAudio() {
		audioState ? muteAudio() : unmuteAudio()
		console.log("audio state", audioState)
	}

	// Checks if user clicked ON miniplayer
	function miniPlayerClickHandler(e) {
		if (e.target.classList.contains("miniPlayerClick")) {
			history.push("/playerPage")
		}
	}

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
			<h1>{currentSong.name}</h1>
			<button>
				<SkipPreviousIcon />
			</button>

			<button onClick={() => ytPlayer.toggleVidBtn()}>
				{ytPlayerState === 1 ? (
					<PauseIcon />
				) : ytPlayerState === 2 ? (
					<PlayArrowIcon />
				) : (
					<PlayArrowIcon />
				)}
			</button>

			<button onClick={() => ytPlayer.playNextSong(queueSongs)}>
				<SkipNextIcon />
			</button>

			<button onClick={toggleAudio}>
				{audioState ? <VolumeOffIcon /> : <VolumeUpIcon />}
			</button>
			<button
				onClick={() => {
					history.push("/queueViewer")
				}}
			>
				<ListIcon />
			</button>
		</div>
	) : (
		<div>
			<h3>No song selected, go back and search for a song!</h3>
			<button onClick={() => history.push("/")}>Home page</button>
		</div>
	)
}

export default PlayerPage
