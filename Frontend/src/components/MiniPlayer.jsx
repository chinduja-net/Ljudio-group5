import React, { useRef, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Player from '../components/Player';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { SearchContext } from '../context/SongProvider';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { AppBar, Toolbar } from '@material-ui/core';
import useStyles from '../styles/MiniPlayerStyle';

function MiniPlayer() {
  const location = useLocation();
  console.log('you are here', location.pathname);
  const classes = useStyles();
  const player = useRef();
  const { currentSong, queueSongs, shiftQueue, setCurrentSong } =
    useContext(SearchContext);

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
    }, 1500);
  }

  function playNextSong() {
    // This will be changed depending on queue list
    /* let videoId = 'uHU48c-dtqk'; */
    console.log('log of queued songs inside playNext func', queueSongs);
    if (queueSongs[0]) {
      let videoId = queueSongs[0].videoId;
      player.current.loadVideoById(videoId);
      player.current.playVideo();
      setPlayingState(true);
      // updates
      setCurrentSong(queueSongs[0]);
      shiftQueue();
    }
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
    console.log('audio state', audioState);
  }

  function showDuration() {
    console.log('Progress bar', player.current.getDuration());
  }

  function fastForward() {
    player.current.seekTo(60);
  }
  return (
    /**
     * Make a check if we are on the playerPage, render the PlayerPage DOM/styling inside the miniPlayer, creating a "viritual" playerPage
     * If we are on any other page BUT the playerPage, render the miniPlayer DOM/styling
     *
     * *Try using routing to check which page we are on
     */ <>
      {location.pathname === '/playerPage' ? (
        <div style={{ width: '200px', height: '200px' }}>
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

          <button onClick={playNextSong}>
            <SkipNextIcon />
          </button>

          <button onClick={showDuration}>SHOW DURATION</button>

          <button onClick={fastForward}></button>

          <button onClick={toggleAudio}>
            {audioState ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </button>
        </div>
      ) : (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
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

            <button onClick={playNextSong}>
              <SkipNextIcon />
            </button>

            <button onClick={showDuration}>SHOW DURATION</button>

            <button onClick={fastForward}>Fast Forward to 1 min</button>

            <button onClick={toggleAudio}>
              {audioState ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

export default MiniPlayer;
