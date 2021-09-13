import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SongProvider(props) {
  const [searchResults, setSearchResults] = useState();
  const [currentSong, setCurrentSong] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [currentArtist, setCurrentArtist] = useState("");
  const [songDetail, setSongDetail] = useState("");
  const [queueSong, setQueueSong] = useState("");

  // ? next in queue view
  // ? next from: playlist/album view

  // ? next/ previous buttons

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
        queueSong,
        setQueueSong,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
