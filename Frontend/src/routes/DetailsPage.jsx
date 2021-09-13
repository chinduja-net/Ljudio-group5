import React from "react";
import { useContext } from "react";

import { SearchContext } from "../context/SongProvider";

 


function DetailsPage() {

    const { currentSong } = useContext(SearchContext);
    
  return (
    <div>
      <img src={currentSong.thumbnail} alt={currentSong.artist + "'s cover thumbnail"} />

      <h4>{currentSong.name}</h4>
      <p>{currentSong.artist}</p>
    </div>
  );
}

export default DetailsPage;
