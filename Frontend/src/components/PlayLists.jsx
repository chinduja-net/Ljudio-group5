import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { Button } from "@mui/material";

import { showUserPlaylistsFetch } from "../services/authService";

function PlayLists() {
  const [playlistsState, setPlaylistsState] = useState([]);

  const history = useHistory();

  function createPlayList() {
    history.push("/CreatePlaylistForm");
  }

  useEffect(async () => {
    let playlists = await showUserPlaylistsFetch();
    setPlaylistsState( playlists );
    console.log("fetched playlists:", playlists);
  }, []);

  async function showUserPlaylists() {
    console.log("playlistsState",playlistsState);
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={createPlayList}
        startIcon={<AddOutlinedIcon />}
      >
        Create Playlist
      </Button>
      <Button variant = "outlined" onClick={showUserPlaylists}>Show Playlists</Button>

      {playlistsState.map(({ playlistName }) => {
        return <p>{playlistName}</p>;
      })}
        
    </>
  );
}

export default PlayLists;
