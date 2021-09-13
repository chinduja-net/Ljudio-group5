import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { SearchContext } from "../context/SongProvider";

function DetailsPage() {
  const { currentSongDetail, setCurrentSong, setQueueSong} = useContext(SearchContext);

  const history = useHistory();

  function addToQueue(){
    console.log(currentSongDetail.videoId)
   // setCurrentSong(currentSongDetail.videoId)
    setQueueSong(currentSongDetail)
    history.push("/playerPage")

  }

  return (

    <div>
      <img
        src={currentSongDetail.thumbnail}
        alt={currentSongDetail.artist + "'s cover thumbnail"}
      />
      <h4>{currentSongDetail.name}</h4>
        <button type = "click" onClick = {addToQueue}>Add to Queue</button>
        <button>Add to PlayList</button>
    </div>
  );
}

export default DetailsPage;
