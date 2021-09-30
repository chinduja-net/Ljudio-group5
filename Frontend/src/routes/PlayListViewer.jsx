import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SongProvider';
import { songsInsidePlaylistFetch } from '../services/authService';

function PlayListViewer() {
  const { selectedPlaylist, setSongsInPlaylist, songsInPlaylist } =
    useContext(SearchContext);

  // On Load call fetchSongsOnMount
  useEffect(fetchSongsOnMount, []);

  // Creates a object with playListId property whos value is the current selected playlists id.
  async function fetchSongsOnMount() {
    let obj = {
      playlistId: selectedPlaylist,
    };
    let foundSongs = await songsInsidePlaylistFetch(obj);
    setSongsInPlaylist(foundSongs);
    console.log('found songs inside playlist viewer', foundSongs);
  }

  // Todo: if state variable exist; render the response data to the DOM
  // Dataset properties on every element in the DOM except maybe buttons
  // make a clickHandler just like in PlayLists.jsx
  // on click JSON.parse dataset obj and set the queue/playlist whatever

  return (
    <>
      <h2>PlayListViewer</h2>
      {songsInPlaylist ? (
        songsInPlaylist.map(
          ({ songName, songId, songVideoId, songArtist }, index) => {
            return (
              // Adds id and index so if the same song is added several times the key prop still works
              <div key={`${songId}${index}`}>
                {/* <div>
            <img
              src={obj.thumbnails[0].url}
              alt={obj.artist.id + "'s cover thumbnail"}
            />
          </div> */}
                <div>
                  <h3>{songName}</h3>
                  <h2>{songVideoId}</h2>
                  <h2>{songArtist}</h2>
                </div>
              </div>
            );
          }
        )
      ) : (
        <h2>No songs found</h2>
      )}
    </>
  );
}

export default PlayListViewer;
