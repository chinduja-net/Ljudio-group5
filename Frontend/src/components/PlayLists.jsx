import React from "react";

import { isLoggedIn } from "../services/authService";

function PlayLists() {

      function createPlayList() {
    isLoggedIn();

      }

  return (
    <div>
      <button onClick={createPlayList}>Create Playlist</button>
    </div>
  );
}

export default PlayLists;
