import React, { useRef, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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
import ListIcon from '@material-ui/icons/List';

function MiniPlayer() {
  const location = useLocation();
  const history = useHistory();
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
      let videoId = currentSong.videoId;
      player.current.loadVideoById(videoId);
      player.current.playVideo();
      setPlayingState(true);
    }, 1500);
  }

  function playNextSong() {
    // Plays next song from queueSongs
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

  // Checks if user clicked ON miniplayer
  function miniPlayerClickHandler(e) {
    if (e.target.classList.contains('miniPlayerClick')) {
      history.push('/playerPage');
    }
  }
  return (
    // Checks if we are on playerPage and if so renders out playerPage DOM
    <>
      {currentSong ? (
        location.pathname === '/playerPage' ? (
          <div style={{ width: '200px', height: '200px' }}>
            <Player onLoad={onPlayerLoad} />
            <img
              src={currentSong.thumbnails[1].url}
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

            <button onClick={toggleAudio}>
              {audioState ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
            <button
              onClick={() => {
                history.push('/queueViewer');
              }}
            >
              <ListIcon />
            </button>
          </div>
        ) : (
          <AppBar
            position="fixed"
            className={`miniPlayerClick ${classes.appBar}`}
            onClick={miniPlayerClickHandler}
          >
            <Toolbar className="miniPlayerClick">
              <Player onLoad={onPlayerLoad} />
              <img
                className="miniPlayerClick"
                src={currentSong.thumbnails[0].url}
                alt="Song tumbnail"
                style={{ width: '120px', height: '120px', borderRadius: '50%' }}
              />
              <h1 className="miniPlayerClick">{currentSong.name}</h1>
              <button>
                <SkipPreviousIcon />
              </button>

              <button onClick={toggleVidBtn}>
                {playingState ? <PauseIcon /> : <PlayArrowIcon />}
              </button>

              <button onClick={playNextSong}>
                <SkipNextIcon />
              </button>

              <button onClick={toggleAudio}>
                {audioState ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </button>
            </Toolbar>
          </AppBar>
        )
      ) : null}
    </>
  );
}

export default MiniPlayer;
