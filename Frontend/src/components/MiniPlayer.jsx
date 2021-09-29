import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/SongProvider';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { AppBar, Toolbar } from '@mui/material';

function MiniPlayer() {
  const history = useHistory();
  const {
    currentSong,
    queueSongs,
    shiftQueue,
    setCurrentSong,
    ytPlayerState,
    ytPlayer,
  } = useContext(SearchContext);

  const [audioState, setAudioState] = useState(true);

  function playNextSong() {
    // If any songs are queued load the first one's videoId and feed it to the player
    if (queueSongs.length) {
      // Get first song from queue and update the queue
      let song = shiftQueue();

      ytPlayer.player.loadVideoById(song.videoId);
      ytPlayer.player.playVideo();
      setCurrentSong(song);
    }
  }

  function muteAudio() {
    ytPlayer.player.mute();
    setAudioState(false);
  }

  function unmuteAudio() {
    ytPlayer.player.unMute();
    setAudioState(true);
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
    // Only renders the miniplayer if a currentSong is in the player
    currentSong ? (
      <AppBar
        position="fixed"
        className={`miniPlayerClick`}
        onClick={miniPlayerClickHandler}
        sx={{
          top: 'auto',
          bottom: 0,
        }}
      >
        <Toolbar className="miniPlayerClick">
          <img
            className="miniPlayerClick"
            src={currentSong.thumbnails[0].url}
            alt="Song tumbnail"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
            }}
          />
          <h1 className="miniPlayerClick">{currentSong.name}</h1>
          <button>
            <SkipPreviousIcon />
          </button>

          <button onClick={() => ytPlayer.toggleVidBtn()}>
            {/* 
							Toggle play button icon based on player state
							1 = playing, 2 = paused
						*/}
            {ytPlayerState === 1 ? (
              <PauseIcon />
            ) : ytPlayerState === 2 ? (
              <PlayArrowIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </button>

          <button onClick={() => playNextSong()}>
            <SkipNextIcon />
          </button>

          <button onClick={toggleAudio}>
            {audioState ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </button>
        </Toolbar>
      </AppBar>
    ) : null
  );
}

export default MiniPlayer;
