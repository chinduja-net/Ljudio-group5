import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { SearchContext } from "../context/SongProvider";

function DetailsPage() {
  const { songDetail, setQueueSongs} = useContext(SearchContext);

  const history = useHistory();

  function addToQueue(){
    console.log(songDetail.videoId)
   // setCurrentSong(currentSongDetail.videoId)
    setQueueSongs(songDetail)
    history.push("/searchResults")

  }

  return (

    <div>
      <img
        src={songDetail.thumbnail}
        alt={songDetail.artist + "'s cover thumbnail"}
      />
      <h4>{songDetail.name}</h4>
        <button type = "click" onClick = {addToQueue}>Add to Queue</button>
        <button>Add to PlayList</button>
    </div>
  );
}

export default DetailsPage;
