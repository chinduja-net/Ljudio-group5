import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

import { Button, Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { showUserPlaylistsFetch, isLoggedIn } from "../services/authService";
import { SearchContext } from "../context/SongProvider";
import CreatePlaylistForm from "./CreatePlaylistForm";

function PlayLists() {
  const { playlistsState, setPlaylistsState, setSelectedPlaylist } =
    useContext(SearchContext);
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
    if(location.pathname==="/") {
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
    if(location.pathname==="/detailsPage") {
      if (e.target.attributes.getNamedItem("data-playList") !== null) {
        const clickedValuePlaylist = JSON.parse(
          e.target.attributes.getNamedItem("data-playList").value
        );
        
        let clickedValuePlaylistId = clickedValuePlaylist.id;
        setSelectedPlaylist(clickedValuePlaylistId);
        const userToken = getToken()

        // POST to database the songDetail to the playlist that was clicked
        // Things to POST:
        // user token from sessionStorage
        // playlistId
        // ? song id / videoId
      }
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "xs" }} display = "flex" flexDirection = "column" justifyContent = "center" alignItems = "center">
      <Typography heading="h5">PLAYLISTS</Typography>
      {renderCreateButton ? (
        <Button
          size = "small"
          variant="outlined"
          onClick={createPlayList}
          startIcon={<AddOutlinedIcon />}
        >
          Create Playlist
        </Button>
      ) : (
        <CreatePlaylistForm setRenderCreateButton={setRenderCreateButton} />
      )}
      
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
                
              >
                <ListItem data-playlist={JSON.stringify(obj)}>
                  <LibraryMusicIcon data-playlist={JSON.stringify(obj)} />
                  <Typography heading="h3" data-playlist={JSON.stringify(obj)}>
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
    </Box>
  );
}

export default PlayLists;
