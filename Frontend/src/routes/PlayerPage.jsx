import React, { useRef, useContext, useState } from 'react';
import Player from '../components/Player';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { SearchContext } from '../context/SongProvider';
import PauseIcon from '@material-ui/icons/Pause';

function PlayerPage() {
  const player = useRef();
  const { currentSong } = useContext(SearchContext);

  const [playingState, setPlayingState] = useState(true);

  function onPlayerLoad(ytPlayer) {
    player.current = ytPlayer;
    setTimeout(() => {
      // Default ID, will change depending on user input later on
      let videoId = currentSong.videoId;
      player.current.loadVideoById(videoId);
      player.current.playVideo();
      setPlayingState(true);
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
    setPlayingState(true);
  }

  function pauseVid() {
    player.current.pauseVideo();
    setPlayingState(false);
  }

  function playVid() {
    player.current.playVideo();
    setPlayingState(true);
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
    playingState ? pauseVid() : playVid();
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
      <img
        src={currentSong.thumbnail}
        alt="Song tumbnail"
        style={{ width: '120px', height: '120px', borderRadius: '50%' }}
      />
      <h1>{currentSong.name}</h1>
      <button>
        <SkipPreviousIcon />
      </button>

      <button onClick={toggleVidBtn}>
        {playingState ? <PauseIcon /> : <PlayArrowIcon />}
      </button>

      <button>
        <SkipNextIcon />
      </button>
      <button onClick={showDuration}>SHOW DURATION</button>
      <button onClick={fastForward}>FAST FORWARD</button>
      <button onClick={toggleAudio}>Toggle mute / unmute</button>
      <button onClick={playNewSong}>ABBA SONGS</button>
    </div>
  );
}

export default PlayerPage;
