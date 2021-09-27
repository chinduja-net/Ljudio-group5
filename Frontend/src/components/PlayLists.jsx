import React from 'react';
import { useHistory } from 'react-router';
import { getUserPlaylistsFetch} from '../services/authService';

import CreatePlaylistForm from './CreatePlaylistForm';

function PlayLists() {
  const history = useHistory();

  function createPlayList() {
   //history.push('/createPlaylistForm');
  }

  function showPlaylists(){
    
  }


  return (
    <div>
      <button onClick={createPlayList}>Create Playlist</button>
    <button onClick={showPlaylists}>Show Playlists</button> 
    </div>
  );
}

export default PlayLists;
