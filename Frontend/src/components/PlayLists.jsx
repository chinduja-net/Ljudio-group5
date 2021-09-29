import React from 'react';
import { useHistory } from 'react-router';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Button} from '@mui/material';


function PlayLists() {
  const history = useHistory();

  function createPlayList() {
   history.push('/CreatePlaylistForm')
  }
 
  return (
    
    <div>

<Button variant="outlined" onClick={createPlayList} startIcon={<AddOutlinedIcon />}>
  Create Playlist
</Button>
      {/* <button onClick={createPlayList}>Create Playlist</button> */}
    
    </div>
  );
}

export default PlayLists;
