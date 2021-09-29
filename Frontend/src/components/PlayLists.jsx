import React, {useState,useEffect}from 'react';
import { useHistory } from 'react-router';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Button} from '@mui/material';

import { showUserPlaylistsFetch } from '../services/authService';

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

<Button variant="outlined" onClick={createPlayList} startIcon={<AddOutlinedIcon />}>
  Create Playlist
</Button>
<button onClick={showUserPlaylists}>Show Playlists</button>

    
    </div>
  );
}

export default PlayLists;
