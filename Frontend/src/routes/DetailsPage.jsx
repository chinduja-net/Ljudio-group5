import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QueueIcon from '@mui/icons-material/Queue';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';

import { SearchContext } from '../context/SongProvider';

function DetailsPage() {
  const { songDetail, addObjToArray } = useContext(SearchContext);
  const history = useHistory();

  //Add songs to the queue list
  function addToQueue() {
    addObjToArray(songDetail);

    history.push('/searchResults');
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#FFF7E3"
        style={{
          height: 700,
          flexDirection: 'column',
        }}
      >
        <img
          style={{ height: 200 }}
          src={songDetail.thumbnails[1].url}
          alt={songDetail.artist.name + "'s cover thumbnail"}
        />
        <Typography fontSize="small" variant="h5">
          {songDetail.name}
        </Typography>
        <Box>
          <IconButton type="click" onClick={addToQueue}>
            <QueueIcon fontSize="large" />
          </IconButton>

          {/* <IconButton>
						<PlaylistAddIcon fontSize="large" />
					</IconButton>

					<IconButton>
						<ShareIcon fontSize="large" />
					</IconButton> */}
        </Box>
      </Box>
    </>
  );
}

export default DetailsPage;
