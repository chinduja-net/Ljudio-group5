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
      height: '0',
      width: '0',
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
    if (event.data != YT.PlayerState.PLAYING) return;
  }

  return <div id="yt-player"></div>;
}

export default Player;
