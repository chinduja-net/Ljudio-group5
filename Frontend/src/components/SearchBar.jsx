import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { InputBase, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/system/Box';
import { SearchContext } from '../context/SongProvider';

function SearchBar() {
  const { setSearchResults } = useContext(SearchContext);
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');

  async function fetchApi() {
    const response = await fetch(
      `https://yt-music-api.herokuapp.com/api/yt/search/${searchInput}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const searchResult = await response.json();

    console.log(searchResult.content);

    let filteredResults = [];

    searchResult.content.forEach((obj) => {
      // Destructure the searchResult to get our desired properties we want to use
      if (obj.type === 'song') {
        filteredResults.push({
          id: nanoid(),
          type: obj.type,
          name: obj.name,
          thumbnails: obj.thumbnails,
          artist: obj.artist.name,
          album: obj.album.browseId,
          duration: obj.duration,
          videoId: obj.videoId,
        });
      }

      if (obj.type === 'album') {
        filteredResults.push({
          id: nanoid(),
          type: obj.type,
          name: obj.name,
          thumbnails: obj.thumbnails,
          artist: obj.artist,
          browseId: obj.browseId,
        });
      }
      if (obj.type === 'artist') {
        filteredResults.push({
          id: nanoid(),
          type: obj.type,
          name: obj.name,
          thumbnails: obj.thumbnails,
          browseId: obj.browseId,
        });
      }
    });
    // Sorts the types after alphabetical order
    filteredResults.sort((a, b) =>
      a.type < b.type ? 1 : b.type < a.type ? -1 : 0
    );
    console.log(filteredResults);
    // update the searchResults context
    setSearchResults(filteredResults);

    // Redirect to the searchResults page if we are not on the home page
    if (location.pathname === '/') {
      history.push('/searchResults');
    }
  }

  return (
    <Box sx={{ width: '300' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchApi();
          }}
        >
          <InputBase
            startAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            style={{
              fontSize: 16,
              background: '#E8EEF3',
              borderRadius: 10,
              textAlign: 'center',
              letterSpacing: -0.5,
              width: 300,
              marginTop: 30,
            }}
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for artists/album/song"
          />
        </form>
      </Box>
    </Box>
  );
}

export default SearchBar;
