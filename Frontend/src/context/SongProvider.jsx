import React, { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export default function SongProvider(props) {
  const [searchResults, setSearchResults] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [currentAlbum, setCurrentAlbum] = useState();
  const [currentArtist, setCurrentArtist] = useState();
  const [songDetail, setSongDetail] = useState({});
  const [queueSongs, setQueueSongs] = useState([]);
  const [ytPlayerState, setYtPlayerState] = useState(-1); // -1 state is unstarted in youtube's api
  const [ytPlayer, setYtPlayer] = useState();
  const [playedSongs, setPlayedSongs] = useState([]);
  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    getLocalQueued();
  }, []);

  useEffect(() => {
    saveQueToLocal();
  }, [queueSongs]);
  // ? next in queue view
  // ? next from: playlist/album view

  // ? next/ previous buttons

  function saveQueToLocal() {
    localStorage.setItem("queued", JSON.stringify(queueSongs));
  }

  function getLocalQueued() {
    if (localStorage.getItem("queued") === null) {
      localStorage.setItem("queued", JSON.stringify([]));
    } else {
      let queuedLocal = JSON.parse(localStorage.getItem("queued"));
      setQueueSongs(queuedLocal);
      setCurrentSong(queuedLocal[0]);
    }
  }

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
    const newArr = [...queueSongs];
    const shifted = newArr.shift();
    setQueueSongs(newArr);
    setPlayedSongs([...playedSongs, shifted]);
    return shifted;
  }

  function popPlayedSongs() {
    const newArr = playedSongs;
    const popped = newArr.pop();
    setPlayedSongs(newArr);
    return popped;
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
        ytPlayerState,
        setYtPlayerState,
        ytPlayer,
        setYtPlayer,
        setQueueSongs,
        playList,
        setPlayList,
        clearQueueSongs,
        changeQueueSongs,
        popPlayedSongs,
        playedSongs,
        setPlayedSongs,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
