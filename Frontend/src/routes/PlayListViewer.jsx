import { Box } from "@mui/system";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SongProvider";
import { songsInsidePlaylistFetch } from "../services/authService";
import { Typography, Container } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CardMedia from "@mui/material/CardMedia";

function PlayListViewer() {
  const {
    selectedPlaylist,
    setSongsInPlaylist,
    songsInPlaylist,
    setCurrentSong,
    setPlayList,
    playList,
  } = useContext(SearchContext);

  // On Load call fetchSongsOnMount
  useEffect(fetchSongsOnMount, []);

  // Creates a object with playListId property whos value is the current selected playlists id.
  async function fetchSongsOnMount() {
    let obj = {
      playlistId: selectedPlaylist,
    };
    let unFormattedfoundSongs = await songsInsidePlaylistFetch(obj);
    console.log("unformattedFoundSongs", unFormattedfoundSongs);

    let formattedSongs = unFormattedfoundSongs.map((obj) => {
      let formattedFoundSongs = {
        name: obj.songName,
        videoId: obj.songVideoId,
        artist: obj.songArtist,
        id: obj.songId,
        thumbnails: [
          {
            url: obj.smallSongPic,
          },
          {
            url: obj.bigSongPic,
          },
        ],
      };
      return formattedFoundSongs;
    });

    console.log("found songs inside playlist viewer", formattedSongs);
    setSongsInPlaylist(formattedSongs);
  }

  function clickHandler(e) {
    if (e.target.attributes.getNamedItem("data-song") !== null) {
      const clickedValueSong = JSON.parse(
        e.target.attributes.getNamedItem("data-song").value
      );
      let clickedSong = {
        name: clickedValueSong.name,
        videoId: clickedValueSong.videoId,
        artist: clickedValueSong.artist,
        id: clickedValueSong.id,
        thumbnails: [
          {
            url: clickedValueSong.thumbnails[0].url,
          },
          {
            url: clickedValueSong.thumbnails[1].url,
          },
        ],
      };
      setCurrentSong(clickedSong);
      console.log("clickedSong obj", clickedSong);
    }
  }

  // Dataset properties on every element in the DOM except maybe buttons
  // make a clickHandler just like in PlayLists.jsx
  // on click JSON.parse dataset obj and set the queue/playlist whatever

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "5px",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <h2>Selected Playlist</h2>
        <PlayCircleIcon
          onClick={() => {
            let newArr = [...songsInPlaylist];
            newArr.shift();
            setPlayList([...newArr, ...playList]);
            setCurrentSong(songsInPlaylist[0]);
          }}
          sx={{ color: "white" }}
        />
      </Container>
      <Container onClick={clickHandler}>
        {songsInPlaylist ? (
          songsInPlaylist.map(
            ({ name, songId, videoId, artist, thumbnails, id }, index) => {
              return (
                // Adds id and index so if the same song is added several times the key prop still works
                <Box
                  data-song={JSON.stringify({
                    name,
                    songId,
                    videoId,
                    artist,
                    thumbnails,
                    id,
                  })}
                  key={`${id}${index}`}
                >
                  {/* <div>
            <img
              src={obj.thumbnails[0].url}
              alt={obj.artist.id + "'s cover thumbnail"}
            />
          </div> */}
                  <Typography
                    data-song={JSON.stringify({
                      name,
                      songId,
                      videoId,
                      artist,
                      thumbnails,
                      id,
                    })}
                    component="div"
                    variant="h5"
                    color="white"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      m: "auto",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 60,
                        height: 60,
                        boxShadow: 10,
                        borderRadius: 2,
                        margin: 1,
                      }}
                      image={thumbnails[0].url}
                      alt="Song tumbnail"
                    />
                    <div>
                      {name} - {artist}
                    </div>
                  </Typography>
                </Box>
              );
            }
          )
        ) : (
          <h2>No songs found</h2>
        )}
      </Container>
    </>
  );
}

export default PlayListViewer;
