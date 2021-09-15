import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import useMediaQuery from '@material-ui/core/useMediaQuery';

/* export function SimpleMediaQuery() {
  const matches = useMediaQuery('(max-width:300px)');

  return <span>{`(max-width:300px) matches: ${matches}`}</span>;
} */


import { SearchContext } from '../context/SongProvider';

function DetailsPage() {
  const { songDetail, addObjToArray } = useContext(SearchContext);

  const history = useHistory();

  function addToQueue() {
    
    addObjToArray(songDetail);
    console.log('console log for entire songDetail obj', songDetail);
    console.log('consol log for songdetail.vidID', songDetail.videoId);
    history.push('/searchResults');
  }

  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor = "#FFF7E3"
    style = {{
      height : 700,
      flexDirection: 'column'
    }}>
    
      <img style = {{height: 200}}
        src={songDetail.thumbnail}
        alt={songDetail.artist + "'s cover thumbnail"}
      />
      <h4>{songDetail.name}</h4>
      <IconButton  type="click" onClick={addToQueue}>
        <AddToQueueIcon fontSize = "large" />
      </IconButton>
     
      <IconButton>
        <PlaylistAddIcon fontSize = "large"/>
      </IconButton>
    </Box>
  );
}

export default DetailsPage;
