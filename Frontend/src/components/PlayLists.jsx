import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

import { Button, Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import {
  showUserPlaylistsFetch,
  isLoggedIn,
  addSongsToPlaylistFetch,
} from "../services/authService";
import { SearchContext } from "../context/SongProvider";
import CreatePlaylistForm from "./CreatePlaylistForm";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[700]),
  backgroundColor: deepPurple[700],
  "&:hover": {
    backgroundColor: deepPurple[300],
  },
}));

function PlayLists() {
  const {
    playlistsState,
    setPlaylistsState,
    setSelectedPlaylist,
    songDetail,
    handlePlaylistOpen,
    handlePlaylistClose,
  } = useContext(SearchContext);
  const [renderCreateButton, setRenderCreateButton] = useState(true);
  const history = useHistory();

  useEffect(fetchOnMountIfLoggedIn, []);

  function createPlayList() {
    setRenderCreateButton(false);
  }

  async function fetchOnMountIfLoggedIn() {
    const data = await isLoggedIn();
    if (data.loggedIn === true) {
      console.log("LOGGED IN on Mount", data.loggedIn);
      let playlists = await showUserPlaylistsFetch();
      setPlaylistsState(playlists);
    }
  }

  function clickHandler(e) {
    // Home page functionality
    if (location.pathname === "/") {
      if (e.target.attributes.getNamedItem("data-playList") !== null) {
        const clickedValuePlaylist = JSON.parse(
          e.target.attributes.getNamedItem("data-playList").value
        );

        console.log(clickedValuePlaylist);
        let clickedValuePlaylistId = clickedValuePlaylist.id;
        setSelectedPlaylist(clickedValuePlaylistId);
        console.log("clicked value id", clickedValuePlaylistId);
        history.push("/playListView");
      }
    }
    // Playlists Modal functionality
    if (location.pathname === "/detailsPage") {
      if (e.target.attributes.getNamedItem("data-playList") !== null) {
        const clickedValuePlaylist = JSON.parse(
          e.target.attributes.getNamedItem("data-playList").value
        );

        let clickedValuePlaylistId = clickedValuePlaylist.id;
        console.log("playlist id", clickedValuePlaylistId);
        console.log("song detail", songDetail);
        setSelectedPlaylist(clickedValuePlaylistId);

        async function addSongDetailAndPlaylistId() {
          const body = {
            playlistId: clickedValuePlaylistId,
            songInfo: {
              songName: songDetail.name,
              songArtist: songDetail.artist,
              smallSongPic: songDetail.thumbnails[0].url,
              bigSongPic: songDetail.thumbnails[1].url,
              songVideoId: songDetail.videoId,
            },
          };
          console.log("body log", body);
          addSongsToPlaylistFetch(body);
        }
        addSongDetailAndPlaylistId();
        handlePlaylistClose();
      }
    }
  }

  return (
    <Box
      sx={{ width: "100%", maxWidth: "xs" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5" color="white">
        Playlists :
      </Typography>

      {playlistsState ? (
        <List onClick={clickHandler}>
          {playlistsState.map((obj, index) => {
            return (
              <Paper
                sx={{
                  marginTop: 0.8,
                  marginBottom: 0.8,
                }}
                key={`${obj.id}${index}`}
                data-playlist={JSON.stringify(obj)}
                style={{ background: "#8090f6" }}
              >
                <ListItem data-playlist={JSON.stringify(obj)}>
                  <LibraryMusicIcon data-playlist={JSON.stringify(obj)} />
                  <Typography
                    heading="h3"
                    data-playlist={JSON.stringify(obj)}
                    color="white"
                    sx={{ ml: 1 }}
                  >
                    {obj.playlistName}
                  </Typography>
                </ListItem>
              </Paper>
            );
          })}
        </List>
      ) : (
        <Typography heading="h4">
          You need to log in before viewing your playlists.
        </Typography>
      )}

      {renderCreateButton ? (
        <ColorButton
          variant="contained"
          onClick={createPlayList}
          startIcon={<AddOutlinedIcon />}
        >
          Create Playlist
        </ColorButton>
      ) : (
        <CreatePlaylistForm setRenderCreateButton={setRenderCreateButton} />
      )}
    </Box>
  );
}

export default PlayLists;
