import React from 'react';
import { useHistory } from 'react-router';

import CreatePlaylistForm from './CreatePlaylistForm';

function PlayLists() {
  const history = useHistory();

  function createPlayList() {
   history.push('/CreatePlaylistForm')
  }
 
  return (
    <div>
      <button onClick={createPlayList}>Create Playlist</button>
    
    </div>
  );
}

export default PlayLists;
