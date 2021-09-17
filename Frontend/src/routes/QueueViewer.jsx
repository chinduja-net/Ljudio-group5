import React, { useContext } from "react";

import { SearchContext } from "../context/SongProvider";

function QueueViewer() {
  const { currentSong, queueSongs } = useContext(SearchContext);

  return (
    <div>
      {/* <button className={hideBtn}>Icon</button> */}
      <h2>Now Playing</h2>
      {currentSong ? (
        <div className="currentSong">
          <img src={currentSong.thumbnails[1].url} alt="song thumbnail" />
          <div>
            <h3>{currentSong.name}</h3>
            <h4>{currentSong.artist.name}</h4>
          </div>
        </div>
      ) : null}

      <div>
        <h2>Next in queue:</h2>
      </div>

      {queueSongs
        ? queueSongs.map((obj, index) => {
            return (
              // Adds id and index so if the same song is added several times the key prop still works
              <div key={`${obj.id} ${index}`} className="queueListContainer">
                <div className="">
                  <h3>{obj.name}</h3>
                  <p>{obj.artist.name}</p>
                </div>
              </div>
            );
          })
        : null}

      {/* <h2>Next from: Playlist</h2>
			<div className="songListContainer">
				<div className=""></div>
			</div>*/}
    </div>
  );
}

export default QueueViewer;
