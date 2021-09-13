import React, { useRef } from 'react';
import Player from '../components/player';

function playerPage() {
  const player = useRef();

  function onPlayerLoad(ytPlayer) {
    player.current = ytPlayer;
    setTimeout(() => {
      // Default ID, will change depending on user input later on
      let videoId = 'dQw4w9WgXcQ';
      player.current.loadVideoById(videoId);
      player.current.playVideo();
    }, 3000);
  }

  // 2 variables controling player state.
  let isPlaying = true;
  let isAudio = true;

  function playNewSong() {
    // This will be changed depending on queue list
    let videoId = 'uHU48c-dtqk';
    player.current.loadVideoById(videoId);
    player.current.playVideo();
  }

  function pauseVid() {
    player.current.pauseVideo();
    isPlaying = false;
  }

  function playVid() {
    player.current.playVideo();
    isPlaying = true;
    console.log('in player log');
  }

  function muteAudio() {
    player.current.mute();
    isAudio = false;
  }

  function unmuteAudio() {
    player.current.unMute();
    isAudio = true;
  }

  // Calls 2 functions depending on if isPlaying is true / false.
  // Toggles between playing and pauseing player
  function toggleVidBtn() {
    isPlaying ? pauseVid() : playVid();
    console.log('player state', isPlaying);
  }

  function toggleAudio() {
    isAudio ? muteAudio() : unmuteAudio();
    console.log('Audio state', isAudio);
  }

  function showDuration() {
    console.log('Progress bar', player.current.getDuration());
  }

  function fastForward() {
    player.current.seekTo(60);
  }

  return (
    <div>
      <Player onLoad={onPlayerLoad} />
      <button onClick={toggleVidBtn}>Play / Pause toggle</button>
      <h1>I have never seen such an ugly page before, BUT it works!</h1>
      <button onClick={playNewSong}>ABBA SONGS</button>
      <button onClick={showDuration}>SHOW DURATION</button>
      <button onClick={fastForward}>FAST FORWARD</button>
      <button onClick={toggleAudio}>Toggle mute / unmute</button>
    </div>
  );
}

export default playerPage;
