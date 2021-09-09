import React from 'react';
import Player from '../components/player';

function playerPage() {
  let player;

  function onPlayerLoad(ytPlayer) {
    player = ytPlayer;
    setTimeout(() => {
      // Default ID, will change depending on user input later on
      let videoId = 'dQw4w9WgXcQ';
      player.loadVideoById(videoId);
      player.playVideo();
    }, 3000);
  }

  // 2 variables controling player state.
  let isPlaying = true;
  let isAudio = true;

  function playNewSong() {
    // This will be changed depending on queue list
    let videoId = 'uHU48c-dtqk';
    player.loadVideoById(videoId);
    player.playVideo();
  }

  function pauseVid() {
    player.pauseVideo();
    isPlaying = false;
  }

  function playVid() {
    player.playVideo();
    isPlaying = true;
  }

  function muteAudio() {
    player.mute();
    isAudio = false;
  }

  function unmuteAudio() {
    player.unMute();
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
  return (
    <div>
      <Player onLoad={onPlayerLoad} />
      <button onClick={toggleVidBtn}>Play / Pause toggle</button>
      <h1>I have never seen such an ugly page before, BUT it works!</h1>
      <button onClick={playNewSong}>ABBA SONGS</button>
      <button onClick={toggleAudio}>Toggle mute / unmute</button>
    </div>
  );
}

export default playerPage;
