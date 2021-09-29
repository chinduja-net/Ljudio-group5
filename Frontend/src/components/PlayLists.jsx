import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { showUserPlaylistsFetch } from "../services/authService";

function PlayLists() {
  const [playlistsState, setPlaylistsState] = useState({
    playlists: [],
  });

  const history = useHistory();

  function createPlayList() {
    history.push("/CreatePlaylistForm");
  }

  useEffect(async () => {
    let playlists = await showUserPlaylistsFetch();
    setPlaylistsState({ playlists });
    console.log("fetched playlists:", playlists);
  }, []);

  async function showUserPlaylists() {
    console.log(playlistsState);
  }

  return (
    <div>
      <button onClick={createPlayList}>Create Playlist</button>
      <button onClick={showUserPlaylists}>Show Playlists</button>
    </div>
  );
}

export default PlayLists;
