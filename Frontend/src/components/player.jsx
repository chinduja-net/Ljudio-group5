import React, { useEffect } from 'react';

function Player({ onLoad }) {
  // store the player in a non-reactive
  // variable to prevent unnecessary re-renders
  let player;

  useEffect(() => {
    onYouTubeIframeAPIReady();
  }, []);

  // gets called automatically when YouTube player loads
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
      height: '400',
      width: '300',
      playerVars: { autoplay: 0 },
      events: {
        onStateChange: onPlayerStateChange,
      },
    });

    onLoad(player);
  }

  // this function triggers when we change song in player
  // can be used to update things, like counters
  function onPlayerStateChange(event) {
    if (event.data != YT.PlayerState.ENDED) return;
    if (event.data === 0) {
      alert('onPlayerStageChange Works!');
    }
  }

  return <div id="yt-player"></div>;
}

export default Player;
