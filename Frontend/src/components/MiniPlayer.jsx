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

function MiniPlayer() {
	const location = useLocation()
	const history = useHistory()
	// const player = useRef();
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

	// function onPlayerLoad(ytPlayer) {
	//   player.current = ytPlayer;
	//   setTimeout(() => {
	//     let videoId = currentSong.videoId;
	//     player.current.loadVideoById(videoId);
	//     player.current.playVideo();
	//     setPlayingState(true);
	//   }, 1000);
	// }

	// function playNextSong() {
	//   // Plays next song from queueSongs
	//   console.log('log of queued songs inside playNext func', queueSongs);
	//   if (queueSongs[0]) {
	//     let videoId = queueSongs[0].videoId;
	//     player.current.loadVideoById(videoId);
	//     player.current.playVideo();
	//     setPlayingState(true);
	//     // updates
	//     setCurrentSong(queueSongs[0]);
	//     shiftQueue();
	//   }
	// }

	function playNextSong() {
		// setQueueSongs(queueSongs)
		// If any songs are queued load the first one's videoId and feed it to the player
		console.log("1 Console log playNextSong in YTplayer.jsx", queueSongs)
		if (queueSongs.length) {
			// let videoId = queueSongs[0].videoId
			let song = shiftQueue()
			console.log("2 Console log playNextSong in YTplayer.jsx", queueSongs)
			console.log("ytPlayer", ytPlayer)
			ytPlayer.player.loadVideoById(song.videoId)
			ytPlayer.player.playVideo()
			console.log("3 Console log playNextSong in YTplayer.jsx", queueSongs)

			// update the queue in the react context
			setCurrentSong(song)
			console.log("4 Console log playNextSong in YTplayer.jsx", queueSongs)
		}
		// else {
		// 	console.log("queueSongs are nullish")
		// }
	}

	/** COPY OF playNextSong
	function playNextSong() {
		// setQueueSongs(queueSongs)
		// If any songs are queued load the first one's videoId and feed it to the player
		console.log("1 Console log playNextSong in YTplayer.jsx", queueSongs)
		if (queueSongs.length) {
			let videoId = queueSongs[0].videoId
			ytPlayer.player.loadVideoById(videoId)
			ytPlayer.player.playVideo()

			console.log("2 Console log playNextSong in YTplayer.jsx", queueSongs)
			// update the queue in the react context
			setCurrentSong(queueSongs[0])
			console.log("3 Console log playNextSong in YTplayer.jsx", queueSongs)
			shiftQueue()
			console.log("4 Console log playNextSong in YTplayer.jsx", queueSongs)
		}
		// else {
		// 	console.log("queueSongs are nullish")
		// }
	}
  */

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

	// Checks if user clicked ON miniplayer
	function miniPlayerClickHandler(e) {
		if (e.target.classList.contains("miniPlayerClick")) {
			history.push("/playerPage")
		}
	}

	return (
		// Checks if we are on playerPage and if so it renders out playerPage DOM
		currentSong ? (
			<AppBar
				position="fixed"
				className={`miniPlayerClick`}
				onClick={miniPlayerClickHandler}
				sx={{
					top: "auto",
					bottom: 0,
				}}
			>
				<Toolbar className="miniPlayerClick">
					<img
						className="miniPlayerClick"
						src={currentSong.thumbnails[0].url}
						alt="Song tumbnail"
						style={{
							width: "120px",
							height: "120px",
							borderRadius: "50%",
						}}
					/>
					<h1 className="miniPlayerClick">{currentSong.name}</h1>
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

					<button onClick={() => playNextSong()}>
						<SkipNextIcon />
					</button>

					<button onClick={toggleAudio}>
						{audioState ? <VolumeUpIcon /> : <VolumeOffIcon />}
					</button>
				</Toolbar>
			</AppBar>
		) : null
	)
}

export default MiniPlayer
