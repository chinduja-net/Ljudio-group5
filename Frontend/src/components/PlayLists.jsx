import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { showUserPlaylistsFetch, isLoggedIn } from '../services/authService';
import { SearchContext } from '../context/SongProvider';
import CreatePlaylistForm from './CreatePlaylistForm';

function PlayLists() {
  const { playlistsState, setPlaylistsState, setSelectedPlaylist } =
    useContext(SearchContext);
  const [renderCreateButton, setRenderCreateButton] = useState(true);
  const history = useHistory();

  useEffect(fetchOnMountIfLoggedIn, []);

  function createPlayList() {
    setRenderCreateButton(false);
  }

  async function fetchOnMountIfLoggedIn() {
    const data = await isLoggedIn();
    if (data.loggedIn === true) {
      let playlists = await showUserPlaylistsFetch();
      setPlaylistsState(playlists);
    }
  }

  function clickHandler(e) {
    if (e.target.attributes.getNamedItem('data-playList') !== null) {
      const clickedValuePlaylist = JSON.parse(
        e.target.attributes.getNamedItem('data-playList').value
      );

      console.log(clickedValuePlaylist);
      let clickedValuePlaylistId = clickedValuePlaylist.id;
      setSelectedPlaylist(clickedValuePlaylistId);
      console.log('clicked value id', clickedValuePlaylistId);
      // history.push to playlistViewer
      history.push('/playListView');
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
      }}
    >
      {renderCreateButton ? (
        <Button
          variant="outlined"
          onClick={createPlayList}
          startIcon={<AddOutlinedIcon />}
        >
          Create Playlist
        </Button>
      ) : (
        <CreatePlaylistForm setRenderCreateButton={setRenderCreateButton} />
      )}
      <Container onClick={clickHandler}>
        {playlistsState
          ? playlistsState.map(({ playlistName, id }, index) => {
              return (
                <Box
                  data-playList={JSON.stringify({
                    playlistName,
                    id,
                  })}
                >
                  <Typography
                    data-playList={JSON.stringify({
                      playlistName,
                      id,
                    })}
                    key={`${id}${index}`}
                  >
                    {playlistName}
                  </Typography>
                </Box>
              );
            })
          : null}
      </Container>
    </Container>
  );
}

export default PlayLists;
