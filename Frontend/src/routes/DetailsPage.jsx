import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchContext } from '../context/SongProvider';

function DetailsPage() {
  const { songDetail, addObjToArray } = useContext(SearchContext);

  const history = useHistory();

  function addToQueue() {
    // setCurrentSong(currentSongDetail.videoId)
    addObjToArray(songDetail);
    console.log('console log for entire songDetail obj', songDetail);
    console.log('consol log for songdetail.vidID', songDetail.videoId);
    history.push('/searchResults');
  }

  return (
    <div>
      <img
        src={songDetail.thumbnail}
        alt={songDetail.artist + "'s cover thumbnail"}
      />
      <h4>{songDetail.name}</h4>
      <button type="click" onClick={addToQueue}>
        Add to Queue
      </button>
      <button>Add to PlayList</button>
    </div>
  );
}

export default DetailsPage;
