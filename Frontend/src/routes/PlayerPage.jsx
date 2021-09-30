import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/SongProvider';
import ProgressBar from '../components/ProgressBar';

import { Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ListIcon from '@mui/icons-material/List';

function PlayerPage() {
  const history = useHistory();
  const {
    currentSong,
    queueSongs,
    shiftQueue,
    shiftPlayList,
    setCurrentSong,
    ytPlayerState,
    ytPlayer,
    playList,
    popPlayedSongs,
  } = useContext(SearchContext);

  const [audioState, setAudioState] = useState(true);

  function playNextSong() {
    // Feed song to player if they exist in either the queue or the next in playlist
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

  return currentSong && ytPlayer ? (
    <div style={{ width: '200px', height: '200px' }}>
      <img
        src={currentSong.thumbnails[1].url}
        alt="Song tumbnail"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
        }}
      />
      <div>
        <div>
          <h1>{currentSong.name}</h1>
          <h2>{currentSong.artist.name}</h2>
        </div>
      </div>

      <ProgressBar />

      <div>
        <button onClick={toggleAudio}>
          {audioState ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </button>

        <button onClick={() => playPrevSong()}>
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

        <button
          onClick={() => {
            history.push('/queueViewer');
          }}
        >
          <ListIcon />
        </button>
      </div>
    </div>
  ) : (
    <div>
      <Typography variant="h5">
        No song selected, go back and search for a song!
      </Typography>
    </div>
  );
}

export default PlayerPage;
