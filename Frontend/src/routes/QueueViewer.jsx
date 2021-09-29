import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import "../styles/queueViewer.css";

import Button from "@mui/material/Button";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import { SearchContext } from "../context/SongProvider";

function QueueViewer() {
  const history = useHistory();

  const {
    currentSong,
    queueSongs,
    clearQueueSongs,
    changeQueueSongs,
    setQueueSongs,
  } = useContext(SearchContext);

  // checks "droparea" , orders and stores it in a new arr passed into setQueue, runs when item is dropped in list
  function handleOnDragEnd(result) {
    if (!result.destination) return; //

    const items = Array.from(queueSongs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQueueSongs(items);
    setTimeout(() => {
      changeQueueSongs(items);
    }, 1000);
  }

  return (
    <>
      <div className="top-container">
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIosRoundedIcon />
        </button>
      </div>
      <div className="np-container">
        <Typography variant="h6" gutterBottom component="div">
          Now Playing:
        </Typography>
        {currentSong ? (
          <div className="currentSong">
            <img src={currentSong.thumbnails[1].url} alt="song thumbnail" />
            <div>
              <Typography variant="subtitle1" gutterBottom component="div">
                {currentSong.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                {currentSong.artist.browseId}
              </Typography>
            </div>
          </div>
        ) : null}
      </div>

      <div className="niq-container">
        <Typography variant="h6" gutterBottom component="div">
          Next in queue:
        </Typography>
        <Button variant="outlined" onClick={clearQueueSongs}>
          Clear Queue
        </Button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="songs">
          {queueSongs
            ? (provided) => (
                <ul
                  className="songs"
                  {...provided.droppableProps}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {queueSongs.map(({ id, name, thumbnails, artist }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="songs-thumb">
                              <img
                                src={thumbnails[0].url}
                                alt={`${name} THumb`}
                              />
                            </div>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              component="div"
                            >
                              {name}
                              {artist.browseId}
                            </Typography>
                            <button>
                              <MoreVertRoundedIcon />
                            </button>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )
            : null}
        </Droppable>
      </DragDropContext>
      {/* <h2>Next from: Playlist</h2>
			<div className="songListContainer">
				<div className=""></div>
			</div>*/}
    </>
  );
}

export default QueueViewer;
