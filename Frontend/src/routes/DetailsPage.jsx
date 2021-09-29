import React from 'react';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import QueueIcon from '@mui/icons-material/Queue';
import IconButton from '@mui/material/IconButton';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { Box, Typography } from '@mui/material';

import { SearchContext } from '../context/SongProvider';

function DetailsPage() {
  const { songDetail, addObjToArray, playList, setPlayList } =
    useContext(SearchContext);
  const history = useHistory();

  //Add songs to the queue list
  function addToQueue() {
    addObjToArray(songDetail);

    history.push('/searchResults');
  }

  function addSongToPlaylist() {
    setPlayList([...playList, songDetail]);
    console.log(playList);
    history.push('/searchResults');
  }
  return (
    <>
      {songDetail.name ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
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
          <div>
            <Box>
              <IconButton type="click" onClick={addToQueue}>
                <QueueIcon fontSize="large" />
              </IconButton>
            </Box>
            <Box>
              <IconButton type="click" onClick={addSongToPlaylist}>
                <PlaylistAddOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
          </div>
        </Box>
      ) : (
        <div>
          <Typography variant="h6">
            You need to search for something first, go back to the home page.
          </Typography>
        </div>
      )}
    </>
  );
}

export default DetailsPage;
