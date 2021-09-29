import React, { useContext } from 'react';
import YouTube from 'react-youtube';

import { SearchContext } from '../context/SongProvider';

function YoutubePlayer() {
  const {
    currentSong,
    queueSongs,
    shiftQueue,
    shiftPlayList,
    setCurrentSong,
    setYtPlayerState,
    ytPlayer,
    setYtPlayer,
    playList,
  } = useContext(SearchContext);

  const opts = {
    height: '100',
    width: '200',
    playerVars: {
      autoplay: 1,
    },
  };

  // Call this on mount
  function _onReady(event) {
    const player = event.target;

    function playVid() {
      player.playVideo();
    }

    function pauseVid() {
      player.pauseVideo();
    }

    function replayVid() {
      player.playVideo();
    }

    // Toggles between playing and pausing the player
    function toggleVidBtn() {
      let state = player.getPlayerState();

      state === 0
        ? replayVid()
        : state === 1
        ? pauseVid()
        : state === 2
        ? playVid()
        : null;
    }

    // Send YTPlayer to a state variable for global access.
    setYtPlayer({
      player,
      toggleVidBtn,
    });
  }

  function autoPlayNextInQueue() {
    // Get first song from queue and update the queue
    let song = shiftQueue();

    ytPlayer.player.loadVideoById(song.videoId);
    ytPlayer.player.playVideo();
    setCurrentSong(song);
  }

  function autoPlayNextInPlayList() {
    // Get first song from playList and update it
    let song = shiftPlayList();

    ytPlayer.player.loadVideoById(song.videoId);
    ytPlayer.player.playVideo();
    setCurrentSong(song);
  }

  // Runs after song in player ends
  function _onEnd(event) {
    if (queueSongs.length) {
      autoPlayNextInQueue();
    } else if (playList.length) {
      autoPlayNextInPlayList();
    }
  }

  // Runs after player state (iframe api) changes
  function _onStateChange(event) {
    let state = event.target.getPlayerState();
    /**
     * -1 unstarted
     * 0 ended
     * 1 playing
     * 2 paused
     * 3 buffering
     * 5 video cued
     */
    setYtPlayerState(state); // playing
  }

  return (
    <YouTube
      videoId={currentSong && currentSong.videoId}
      opts={opts}
      onReady={_onReady}
      onEnd={_onEnd}
      onStateChange={_onStateChange}
    />
  );
}

export default YoutubePlayer;
