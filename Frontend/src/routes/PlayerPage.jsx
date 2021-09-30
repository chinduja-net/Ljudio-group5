import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../context/SongProvider";
import ProgressBar from "../components/ProgressBar";

import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { AppBar, Toolbar } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeMaxSharpIcon from "@mui/icons-material/HomeMaxSharp";

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
    popPlayedSongs,
    playedSongs,
  } = useContext(SearchContext);

  const [audioState, setAudioState] = useState(true);

  const theme = useTheme();

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

  // Only renders the miniplayer if a currentSong is in the player
  return currentSong ? (
    <Card
      sx={{
        display: "flex",
        bgcolor: "#FFF7E3",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 121,
          height: 121,
          boxShadow: 10,
          borderRadius: 4,
          margin: 1,
        }}
        image={currentSong.thumbnails[1].url}
        alt="Song tumbnail"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="div" variant="h5">
            {currentSong.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {currentSong.artist.name}
            <ProgressBar />
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton onClick={toggleAudio}>
            {audioState ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>

          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon onClick={() => playPrevSong()} />
            )}
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
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon onClick={() => playNextSong()} />
            )}
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
      </Box>
    </Card>
  ) : (
    <>
      <Typography variant="subtitle1" gutterBottom component="div" m={2}>
        No song selected, go back and search for a song!
        <IconButton>
          {" "}
          <HomeMaxSharpIcon onClick={() => history.push("/")} />
        </IconButton>
      </Typography>
    </>
  );
}

export default PlayerPage;
