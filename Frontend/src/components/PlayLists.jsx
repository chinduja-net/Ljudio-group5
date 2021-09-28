import React from "react";
import { useHistory } from "react-router";
import { showUserPlaylistsFetch } from "../services/authService";

function PlayLists() {
  const history = useHistory();

  function createPlayList() {
    history.push("/CreatePlaylistForm");
  }

  async function showUserPlaylists() {
    showUserPlaylistsFetch();
  }

  return (
    <div>
      <button onClick={createPlayList}>Create Playlist</button>
      <button onClick={showUserPlaylists}>Show Playlists</button>
    </div>
  );
}

export default PlayLists;
