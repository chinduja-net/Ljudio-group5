import React from 'react';

import { isLoggedIn } from '../services/authService';

function PlayLists() {
  function createPlayList() {
    isLoggedIn();
  }

  async function showPlaylists() {}

  return (
    <div>
      <button onClick={createPlayList}>Create Playlist</button>
      <button onClick={showPlaylists}>Show Playlists</button>
    </div>
  );
}

export default PlayLists;
