import { Box } from '@mui/system';
import React from 'react';
import { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SongProvider';
import { songsInsidePlaylistFetch } from '../services/authService';
import { Typography, Container } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function PlayListViewer() {
  const {
    selectedPlaylist,
    setSongsInPlaylist,
    songsInPlaylist,
    setCurrentSong,
    setPlayList,
    playList,
  } = useContext(SearchContext);

  useEffect(fetchSongsOnMount, []);

  // Post the selected playlist to the database and get corresponding songs
  async function fetchSongsOnMount() {
    let obj = {
      playlistId: selectedPlaylist,
    };
    let unFormattedfoundSongs = await songsInsidePlaylistFetch(obj);

    // Re-format songs since the db cant have arrays
    let formattedSongs = unFormattedfoundSongs.map((obj) => {
      let formattedFoundSongs = {
        name: obj.songName,
        videoId: obj.songVideoId,
        artist: obj.songArtist,
        id: obj.songId,
        thumbnails: [
          {
            url: obj.smallSongPic,
          },
          {
            url: obj.bigSongPic,
          },
        ],
      };
      return formattedFoundSongs;
    });
    setSongsInPlaylist(formattedSongs);
  }

  function clickHandler(e) {
    if (e.target.attributes.getNamedItem('data-song') !== null) {
      const clickedValueSong = JSON.parse(
        e.target.attributes.getNamedItem('data-song').value
      );
      let clickedSong = {
        name: clickedValueSong.name,
        videoId: clickedValueSong.videoId,
        artist: clickedValueSong.artist,
        id: clickedValueSong.id,
        thumbnails: [
          {
            url: clickedValueSong.thumbnails[0].url,
          },
          {
            url: clickedValueSong.thumbnails[1].url,
          },
        ],
      };
      setCurrentSong(clickedSong);
    }
  }

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}
      >
        <Typography variant="h4">PlayListViewer</Typography>
        <PlayCircleIcon
        sx={{marginLeft: 2, color: "#1976d2"}}
        fontSize="large"
          onClick={() => {
            let newArr = [...songsInPlaylist];
            newArr.shift();
            setPlayList([...newArr, ...playList]);
            setCurrentSong(songsInPlaylist[0]);
          }}
        />
      </Container>
      <Container onClick={clickHandler}>
        {songsInPlaylist ? (
          songsInPlaylist.map(
            ({ name, songId, videoId, artist, thumbnails, id }, index) => {
              return (
                // Adds id and index so if the same song is added several times the key prop still works
                <Box
                  data-song={JSON.stringify({
                    name,
                    songId,
                    videoId,
                    artist,
                    thumbnails,
                    id,
                  })}
                  key={`${id}${index}`}
                >
                  <Typography
                    data-song={JSON.stringify({
                      name,
                      songId,
                      videoId,
                      artist,
                      thumbnails,
                      id,
                    })}
                  >
                    {name} {artist}
                    <img src={thumbnails[0].url} alt="" />
                  </Typography>
                </Box>
              );
            }
          )
        ) : (
          <Typography variant="h2">No songs found</Typography>
        )}
      </Container>
    </>
  );
}

export default PlayListViewer;
