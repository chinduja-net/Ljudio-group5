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
    shiftPlayList,
    setCurrentSong,
    ytPlayerState,
    ytPlayer,
    popPlayedSongs,
    playedSongs,
    playList,
  } = useContext(SearchContext);

  const [audioState, setAudioState] = useState(true);

  function playNextSong() {
    // Feed song to player if they exist in eiter the queue or the next in playlist and update the arrays
    if (queueSongs.length) {
      let song = shiftQueue();

      ytPlayer.player.loadVideoById(song.videoId);
      ytPlayer.player.playVideo();
      setCurrentSong(song);
    } else if (playList.length) {
      let song = shiftPlayList();

      ytPlayer.player.loadVideoById(song.videoId);
      ytPlayer.player.playVideo();
      setCurrentSong(song);
    }
  }

  function playPrevSong() {
    //plays last song in playedSongs array and pops last element
    if (playedSongs.length) {
      let song = popPlayedSongs();
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

  function miniPlayerClickHandler(e) {
    if (e.target.classList.contains('miniPlayerClick')) {
      history.push('/playerPage');
    }
  }

  return currentSong ? (
    <AppBar
      position="fixed"
      className={`miniPlayerClick`}
      onClick={miniPlayerClickHandler}
      sx={{
        top: 'auto',
        bottom: 56,
        zIndex: 98,
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
        <button onClick={() => playPrevSong()}>
          <SkipPreviousIcon />
        </button>

        <button onClick={() => ytPlayer.toggleVidBtn()}>
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
  ) : null;
}

export default MiniPlayer;
