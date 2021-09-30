import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../context/SongProvider";

import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { AppBar, Toolbar } from "@mui/material";
import ProgressBar from "../components/ProgressBar";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListIcon from "@mui/icons-material/List";
import IconButton from "@mui/material/IconButton";

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
    // Feed song to player if they exist in either the queue or the next in playlist
    if (queueSongs.length) {
      // Get first song from queue and update the queue
      let song = shiftQueue();

      ytPlayer.player.loadVideoById(song.videoId);
      ytPlayer.player.playVideo();
      setCurrentSong(song);
    } else if (playList.length) {
      // Get first song from playList and update it
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
    console.log("audio state", audioState);
  }

  // Checks if user clicked ON miniplayer
  function miniPlayerClickHandler(e) {
    if (e.target.classList.contains("miniPlayerClick")) {
      history.push("/playerPage");
    }
  }

  return (
    // Only renders the miniplayer if a currentSong is in the player
    currentSong ? (
      <AppBar
        position="fixed"
        className={`miniPlayerClick`}
        onClick={miniPlayerClickHandler}
        style={{
          background:
            "linear-gradient(273deg, rgba(77,85,226,1) 0%, rgba(108,138,227,1) 50%, rgba(126,179,227,1) 100%)",
        }}
        sx={{
          top: "auto",
          bottom: 56,
          zIndex: 98,
        }}
      >
        <Toolbar
          className={`miniPlayerClick`}
          sx={{
            display: "flex",
            justifyContent: {
              sm: "space-around",
              xs: "flex-start",
            },
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              className={`miniPlayerClick`}
              sx={{
                width: 60,
                height: 60,
                boxShadow: 10,
                borderRadius: 2,
                margin: 1,
              }}
              image={currentSong.thumbnails[1].url}
              alt="Song tumbnail"
            />

            <Typography
              className={`miniPlayerClick`}
              component="div"
              variant="h5"
            >
              {currentSong.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
            }}
          >
            <ProgressBar />
            <div>
              <IconButton aria-label="next" onClick={() => playPrevSong()}>
                <SkipPreviousIcon />
              </IconButton>

              <IconButton
                aria-label="play/pause"
                onClick={() => ytPlayer.toggleVidBtn()}
              >
                {ytPlayerState === 1 ? (
                  <PauseIcon sx={{ height: 38, width: 38 }} />
                ) : ytPlayerState === 2 ? (
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                ) : (
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                )}
              </IconButton>

              <IconButton aria-label="next" onClick={() => playNextSong()}>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Box>

          <Box sx={{ display: "flex" }}>
            <IconButton onClick={toggleAudio}>
              {audioState ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
            <IconButton>
              {" "}
              <ListIcon
                onClick={() => {
                  history.push("/queueViewer");
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    ) : null
  );
}

export default MiniPlayer;
