import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SongProvider(props) {
  const [searchResults, setSearchResults] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [currentAlbum, setCurrentAlbum] = useState();
  const [currentArtist, setCurrentArtist] = useState();
  const [songDetail, setSongDetail] = useState({});
  const [queueSongs, setQueueSongs] = useState([]);
  const [playedSongs, setPlayedSongs] = useState([]);

  // ? next in queue view
  // ? next from: playlist/album view

  // ? next/ previous buttons

  function addObjToArray(newObj) {
    setQueueSongs([...queueSongs, newObj]);
  }

  function clearQueueSongs() {
    setQueueSongs([]);
  }

  function changeQueueSongs(props) {
    const newArr = queueSongs;
    newArr.splice(0, newArr.length, ...props);
    setQueueSongs(newArr);
  }

  function shiftQueue() {
    const newArr = queueSongs;
    const shiftedSong = newArr.shift();
    setQueueSongs(newArr);

    setPlayedSongs([...playedSongs, shiftedSong]);
    console.log(playedSongs);
  }

  function popPlayedSongs() {
    const newArr = playedSongs;
    newArr.pop();
    setPlayedSongs(newArr);
  }

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        currentSong,
        setCurrentSong,
        currentAlbum,
        setCurrentAlbum,
        currentArtist,
        setCurrentArtist,
        songDetail,
        setSongDetail,
        queueSongs,
        addObjToArray,
        shiftQueue,
        clearQueueSongs,
        changeQueueSongs,
        setQueueSongs,
        popPlayedSongs,
        playedSongs,
        setPlayedSongs,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
