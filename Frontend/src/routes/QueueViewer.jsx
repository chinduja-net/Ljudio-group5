import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { SearchContext } from '../context/SongProvider';

function QueueViewer() {
  const history = useHistory();

  const {
    currentSong,
    queueSongs,
    clearQueueSongs,
    changeQueueSongs,
    setQueueSongs,
    shuffleSongs,
    playList,
  } = useContext(SearchContext);

  // checks "droparea" , orders and stores it in a new arr passed into setQueue, runs when item is dropped in list
  function handleOnDragEnd(result) {
    if (!result.destination) return;

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
            <img src={currentSong.thumbnails[0].url} alt="song thumbnail" />
            <div>
              <Typography variant="subtitle1" gutterBottom component="div">
                {currentSong.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                {currentSong.artist}
              </Typography>
            </div>
          </div>
        ) : null}
      </div>

      <div className="niq-container">
        <Typography variant="h6" gutterBottom component="div">
          Next in queue:
        </Typography>
        <div>
          <Button variant="outlined" onClick={shuffleSongs}>
            <ShuffleIcon />
          </Button>
          <Button variant="outlined" onClick={clearQueueSongs}>
            Clear Queue
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="songs">
          {queueSongs
            ? (provided) => (
                <List
                  className="songs"
                  {...provided.droppableProps}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {queueSongs.map(({ id, name, thumbnails, artist }, index) => {
                    return (
                      <Draggable
                        key={`${id}${index}`}
                        draggableId={id}
                        index={index}
                      >
                        {(provided) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="songs-thumb">
                              <img
                                src={thumbnails[1].url}
                                alt={`${name} Thumbnail`}
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
                          </ListItem>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </List>
              )
            : null}
        </Droppable>
      </DragDropContext>
      <div>
      <Typography variant="h6" gutterBottom component="div">
          Next in playlist:
        </Typography>
        <List>
          {playList
            ? playList.map(({ id, name, thumbnails, artist }, index) => {
                return (
                  <ListItem key={`${id}${index}${index}`}>
                    <div className="songs-thumb">
                      <img src={thumbnails[0].url} alt={`${name} THumb`} />
                    </div>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      {name}
                      {artist}
                    </Typography>
                  </ListItem>
                );
              })
            : null}
        </List>
      </div>
    </>
  );
}

export default QueueViewer;
