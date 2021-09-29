import React from "react";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SongProvider";

function PlayListViewer() {
  const { playList} = useContext(SearchContext);
  /* const[userPlaylists, setUserPlaylists] = useState({
    playlists: []
  }); */
  
  /* useEffect(() => {
    async function doFetching(){
      let response = await fetch(`/api/userById/`,{

        method: 'GET'


      })
      let playlists = await response.json();
      console.log(playlists)

    }doFetching()
  }, []) */
 

  return (
    <>
      <h2>PlayListViewer</h2>
      
        {/* {playList.map((obj, index) => {
        return (
          // Adds id and index so if the same song is added several times the key prop still works
            <div key={`${obj.id} ${index}`}>
            <div><img
              src={obj.thumbnails[0].url}
              alt={obj.artist.id + "'s cover thumbnail"} /></div>
            <div><h3>{obj.name}</h3></div>
          </div>
          
        );
      })} */}
    </>
  );
}

export default PlayListViewer;
