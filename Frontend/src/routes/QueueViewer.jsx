import React, { useContext, useEffect } from "react";

import { SearchContext } from "../context/SongProvider";

function QueueViewer() {
  const { dataString: currentSong } = useContext(SearchContext);
  const _DONTUSETHIS_currentSong = "XqoanTj5pNY";

  // Fetch song info using the currentSong string
  async function getSongInfo() {}

  useEffect(() => {
    console.log();
  }, []);

  return (
    <div>
      {/* <button className={hideBtn}>Icon</button> */}
      <h2>Now Playing</h2>
      <div className="currentSong">
        <img src="" alt="" />
        <div>
          {/* <h3>{fetchedSongInfo.name}</h3> */}
          {/* <h4>{fetchedSongInfo.artist}</h4> */}
        </div>
      </div>

      <div>
        <h2>Next in queue</h2>
        <button className="clearQueue">Clear</button>
      </div>
      <div className="songListContainer">
        <div className=""></div>
      </div>

      <h2>Next from: Playlist</h2>
      <div className="songListContainer">
        <div className=""></div>
      </div>
    </div>
  );
}

export default QueueViewer;
