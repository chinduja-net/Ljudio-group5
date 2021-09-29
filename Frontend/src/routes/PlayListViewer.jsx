import React from "react";
import { useContext } from "react";
import { SearchContext } from "../context/SongProvider";

function PlayListViewer() {
  const { playList} = useContext(SearchContext);
  console.log(playList);

  return (
    <>
      <h2>PlayListViewer</h2>
      
        {playList.map((obj, index) => {
        return (
          // Adds id and index so if the same song is added several times the key prop still works
            <div key={`${obj.id} ${index}`}>
            <div><img
              src={obj.thumbnails[0].url}
              alt={obj.artist.id + "'s cover thumbnail"} /></div>
            <div><h3>{obj.name}</h3></div>
          </div>
          
        );
      })}
    </>
  );
}

export default PlayListViewer;
