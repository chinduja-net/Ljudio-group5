import React, { useContext } from 'react';
import { SearchContext } from '../context/SongProvider';
import SearchBar from '../components/SearchBar';

function SearchResults() {
  const { searchResults } = useContext(SearchContext);

  return (
    <div id="root">
      <h5>SearchResults.jsx</h5>
      <SearchBar />
      {searchResults ? (
        // When looping through the search results we can limit the loop with user input
        <div>
          <p>{searchResults[0].videoId}</p>
          <p>{searchResults[0].type}</p>
          <h2>{searchResults[0].name}</h2>
          <h3>{searchResults[0].artist}</h3>
          <img src={searchResults[0].thumbnails[0].url} alt="" />
        </div>
      ) : (
        console.warn('no search results')
      )}
    </div>
  );
}

export default SearchResults;
