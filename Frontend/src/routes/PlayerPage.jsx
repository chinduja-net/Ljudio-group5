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

  function playNewSong() {
    // This will be changed depending on queue list
    let videoId = 'uHU48c-dtqk';
    player.loadVideoById(videoId);
    player.playVideo();
  }

  function pauseBtn() {
    player.pauseVideo(2);
  }

  function playBtn() {
    player.playVideo();
  }

  function muteBtn() {
    player.mute();
  }

  function unmuteBtn() {
    player.unMute();
  }

  return (
    <div>
      <Player onLoad={onPlayerLoad} />
      <h1>I have never seen such an ugly page before, BUT it works!</h1>
      <button onClick={playNewSong}>ABBA SONGS</button>
      <button onClick={pauseBtn}>Pause Button</button>
      <button onClick={playBtn}>Play Button</button>
      <button onClick={muteBtn}>Mute Button</button>
      <button onClick={unmuteBtn}>Unmute Button</button>
    </div>
  );
}

export default playerPage;
