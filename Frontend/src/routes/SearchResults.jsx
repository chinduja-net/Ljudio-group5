import React, { useContext } from 'react';
import { SearchContext } from '../context/SongProvider';
import SearchBar from '../components/SearchBar';
import style from '../styles/SearchResults.module.css';

function SearchResults() {
  const {
    searchResults,
    setCurrentSong,
    setCurrentAlbum,
    setCurrentArtist,
    currentSong,
    currentAlbum,
    currentArtist,
  } = useContext(SearchContext);

  function renderSong(object) {
    return (
      <div
        className={style.result_card}
        data-render-song={JSON.stringify(object)}
        key={object.id}
      >
        <p>{object.type}</p>
        <img
          className={style.result_ThumbnailSquare}
          src={object.thumbnail}
          alt={object.artist + "'s cover thumbnail"}
        />
        <div>
          <h4>{object.name}</h4>
          <p>{object.artist}</p>
        </div>
        <button type="button" className="resultSettingsBtn">
          :{/* Add an icon */}
        </button>
      </div>
    );
  }
  function renderArtist(object) {
    return (
      <div
        className={style.result_card}
        data-render-artist={JSON.stringify(object)}
        key={object.id}
      >
        <p>{object.type}</p>
        <img
          className={style.result_ThumbnailArtist}
          src={object.thumbnail}
          alt={object.name + "'s cover thumbnail"}
        />
        <h3>{object.name}</h3>
      </div>
    );
  }
  function renderAlbum(object) {
    return (
      <div
        className={style.result_card}
        data-render-album={JSON.stringify(object)}
        key={object.id}
      >
        <p>{object.type}</p>
        <img
          className={style.result_ThumbnailSquare}
          src={object.thumbnail}
          alt={object.artist + "'s cover thumbnail"}
        />
        <div>
          <h4>{object.name}</h4>
          <p>{object.artist}</p>
        </div>
      </div>
    );
  }

  function resultsClickHandler(e) {
    // Look at the clicked element and determine their types, then update the context with the element's connected data
    // SONG
    if (e.target.attributes.getNamedItem('data-render-song') !== null) {
      let clickedValueSong = JSON.parse(
        e.target.attributes.getNamedItem('data-render-song').value
      );
      console.log('parsed SONG: ', clickedValueSong);

      setCurrentSong(clickedValueSong);
    }

    // Look at the clicked element and determine their types, then update the context with the element's connected data
    // ARTIST
    if (e.target.attributes.getNamedItem('data-render-artist') !== null) {
      let clickedValueArtist = JSON.parse(
        e.target.attributes.getNamedItem('data-render-artist').value
      );
      console.log('parsed ARTIST: ', clickedValueArtist);

      setCurrentArtist(clickedValueArtist);
    }

    // Look at the clicked element and determine their types, then update the context with the element's connected data
    // ALBUM
    if (e.target.attributes.getNamedItem('data-render-album') !== null) {
      let clickedValueAlbum = JSON.parse(
        e.target.attributes.getNamedItem('data-render-album').value
      );
      console.log('parsed ALBUM: ', clickedValueAlbum);

      setCurrentAlbum(clickedValueAlbum);
    }

    // ! Maybe a bug, the context doesn't seem to update instantly because it's always logging the PREVIOUS context value
    console.log('currentSong Context: ', currentSong);
    console.log('currentAlbum Context: ', currentAlbum);
    console.log('currentArtist Context: ', currentArtist);
  }

  return (
    <div id="root">
      <h5>SearchResults.jsx</h5>
      <SearchBar />
      <div className={style.result_container} onClick={resultsClickHandler}>
        {searchResults // When looping through the search results we can limit the loop with user input
          ? searchResults.map((obj) => {
              return obj.type === 'song'
                ? renderSong(obj)
                : obj.type === 'artist'
                ? renderArtist(obj)
                : obj.type === 'album'
                ? renderAlbum(obj)
                : null;
            })
          : null}
      </div>
    </div>
  );
}

export default SearchResults;
