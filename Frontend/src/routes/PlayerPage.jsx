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
    // ABBA
    let videoId = 'uHU48c-dtqk';
    player.loadVideoById(videoId);
    player.playVideo();
  }

  return (
    <div>
      <Player onLoad={onPlayerLoad} />
      <h1>I have never seen such an ugly page before, BUT it works!</h1>
      <button onClick={playNewSong}>ABBA SONGS</button>
    </div>
  );
}

export default playerPage;
