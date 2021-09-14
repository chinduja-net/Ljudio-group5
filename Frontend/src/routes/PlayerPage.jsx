import React, { useRef, useContext, useState } from 'react';
import Player from '../components/Player';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { SearchContext } from '../context/SongProvider';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

function PlayerPage() {
  const player = useRef();
  const { currentSong } = useContext(SearchContext);

  // 2 states, 1 checking for if its playing or paused and the other checks for audio / no audio
  const [playingState, setPlayingState] = useState(true);
  const [audioState, setAudioState] = useState(true);

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
    setAudioState(false);
  }

  function unmuteAudio() {
    player.current.unMute();
    setAudioState(true);
  }

  // Calls 2 functions depending on if playingState is true / false.
  // Toggles between playing and pauseing player
  function toggleVidBtn() {
    playingState ? pauseVid() : playVid();
    console.log('player state', playingState);
  }

  function toggleAudio() {
    audioState ? muteAudio() : unmuteAudio();
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
      <button onClick={fastForward}></button>
      <button onClick={toggleAudio}>
        {audioState ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </button>
      <button onClick={playNewSong}>ABBA SONGS</button>
    </div>
  );
}

export default PlayerPage;
