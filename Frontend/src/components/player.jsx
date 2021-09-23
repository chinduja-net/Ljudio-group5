import React, { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../context/SongProvider';

function Player({ onLoad }) {
  const {
    currentSong,
    queueSongs,
    shiftQueue,
    setCurrentSong,
    playingState,
    setPlayingState,
  } = useContext(SearchContext);
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

  function playNextSong() {
    // Plays next song from queueSongs
    console.log('log of queued songs inside playNext func', queueSongs);
    if (queueSongs[0]) {
      let videoId = queueSongs[0].videoId;
      player.loadVideoById(videoId);
      setCurrentSong(queueSongs[0]);
      player.playVideo();
      setPlayingState(true);
      // updates
      shiftQueue();
    }
  }
  // this function triggers when we change song in player
  // can be used to update things, like counters
  function onPlayerStateChange(event) {
    if (event.data != YT.PlayerState.ENDED) return;
    if (event.data === 0) {
      playNextSong();
    }
  }

  return <div id="yt-player"></div>;
}

export default Player;
