import React, { useEffect, useContext, useState } from "react"
import { SearchContext } from "../context/SongProvider"



function muteAudio(player) {
  player.current.mute();
  setAudioState(false);
}

function unmuteAudio(player) {
  player.current.unMute();
  setAudioState(true);
}

function Player({ onLoad }) {
  const {currentSong, setCurrentSong, shiftQueue, ytPlayer, setYtPlayer, ytPlayerState, setYtPlayerState} = useContext(SearchContext)
  const [audioState, setAudioState] = useState(true);

	// store the player in a non-reactive
	// variable to prevent unnecessary re-renders
	let player

	useEffect(() => {
		onYouTubeIframeAPIReady()
	}, [])

	// gets called automatically when YouTube player loads
	function onYouTubeIframeAPIReady() {
		player = new YT.Player("yt-player", {
			height: "400",
			width: "300",
			playerVars: { autoplay: 0 },
			events: {
				onStateChange: onPlayerStateChange,
        onReady: onPlayerLoad
			},
		})

		function toggleVidBtn() {
			ytPlayerState === 1
				? player.current.pauseVideo()
				: ytPlayerState === 2
				? player.current.playVideo()
				: null
			console.log("player state", ytPlayerState)
		}

    function toggleAudio() {
      audioState ? muteAudio(player) : unmuteAudio(player);
      console.log('audio state', audioState);
    }

    function playNextSong() {
      // Plays next song from queueSongs
      console.log('log of queued songs inside playNext func', queueSongs);
      if (queueSongs[0]) {
        let videoId = queueSongs[0].videoId;
        player.current.loadVideoById(videoId);
        player.current.playVideo();

        // updates
        setCurrentSong(queueSongs[0]);
        shiftQueue();
      }
    }

		setYtPlayer({ player, toggleVidBtn, toggleAudio, playNextSong})
		onLoad(player)
	}
  
  function onPlayerLoad() {
    if(!currentSong) return

    const videoId = currentSong.videoId
    ytPlayer.player.current.loadVideoById(videoId)
    ytPlayer.player.current.playVideo()
  }

	// this function triggers when we change song in player
	// can be used to update things, like counters
	function onPlayerStateChange(event) {
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
	}

	return <div id="yt-player"></div>
}

export default Player
