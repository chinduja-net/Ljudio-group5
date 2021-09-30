import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { SearchContext } from "../context/SongProvider";
import SearchBar from "../components/SearchBar";

import { Grid, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function SearchResults() {
  const {
    searchResults,
    setCurrentSong,
    setCurrentAlbum,
    setCurrentArtist,
    setSongDetail,
    setPlayedSongs,
    playedSongs,
  } = useContext(SearchContext);

  const history = useHistory();

  function renderSong(object) {
    return (
      <Paper
        key={`${object.id}`}
        sx={{ height: 250, width: 150, marginTop: 2 }}
        style={{ background: "#8090f6" }}
      >
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          data-render-song={JSON.stringify(object)}
          data-render-details={JSON.stringify(object)}
          key={object.id}
          sx={{ m: "auto" }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 60,
              height: 60,
              boxShadow: 5,
              borderRadius: 1,
              margin: 1,
            }}
            image={object.thumbnails[0].url}
            alt="Song tumbnail"
          />
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            color="white"
          >
            {object.name}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            color="white"
          >
            {object.artist}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            type="click"
            onClick={showSongDetails}
            color="secondary"
            style={{ color: "white" }}
            sx={{ mt: 2 }}
          >
            Add to
          </Button>
        </Grid>
      </Paper>
    );
  }

  function renderArtist(object) {
    return (
      <Paper
        key={`${object.id}`}
        sx={{ height: 200, width: 150, marginTop: 2 }}
        style={{ background: "#8090f6" }}
      >
        <Grid
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          data-render-artist={JSON.stringify(object)}
          key={object.id}
        >
          <p data-render-artist={JSON.stringify(object)}>{object.type}</p>
          <img
            data-render-artist={JSON.stringify(object)}
            src={object.thumbnails[0].url}
            alt={"artist thumbnail"}
          />
          <h3 data-render-artist={JSON.stringify(object)}>{object.name}</h3>
        </Grid>
      </Paper>
    );
  }
  function renderAlbum(object) {
    return (
      <Paper
        key={`${object.id}`}
        sx={{ height: 200, width: 150, marginTop: 2 }}
        style={{ background: "#8090f6" }}
      >
        <Grid
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          data-render-album={JSON.stringify(object)}
          key={object.id}
        >
          <img
            data-render-album={JSON.stringify(object)}
            src={object.thumbnails[0].url}
            alt={"album cover"}
          />

          <h4 data-render-album={JSON.stringify(object)}>{object.name}</h4>
          <p data-render-album={JSON.stringify(object)}>{object.artist}</p>
        </Grid>
      </Paper>
    );
  }

  function addToPlaylist(e) {
    if (
      e.currentTarget.parentElement.attributes.getNamedItem(
        "data-render-details"
      ) !== null
    ) {
      let addToListSong = JSON.parse(
        e.currentTarget.parentElement.attributes.getNamedItem(
          "data-render-details"
        ).value
      );
      setPlayList([...playList, addToListSong]);
    }
  }

  function playListView() {
    history.push("/playListView");
  }

  //Displays the details of the song in a new page or route
  function showSongDetails(e) {
    if (
      e.currentTarget.parentElement.attributes.getNamedItem(
        "data-render-details"
      ) !== null
    ) {
      let clickedDetailSong = JSON.parse(
        e.currentTarget.parentElement.attributes.getNamedItem(
          "data-render-details"
        ).value
      );

      setSongDetail(clickedDetailSong);
      history.push("/detailsPage");
    }
  }

  //Handles all of the clicks inside of the dynamic DOM and serves the context the relevant data

  function resultsClickHandler(e) {
    if (e.target.attributes.getNamedItem("data-render-song") !== null) {
      let clickedValueSong = JSON.parse(
        e.target.attributes.getNamedItem("data-render-song").value
      );

      setCurrentSong(clickedValueSong);
      setPlayedSongs([...playedSongs, clickedValueSong]);
      history.push("/playerPage");
    }

    // Look at the clicked element and determine their types, then update the context with the element's connected data
    // ARTIST
    if (e.target.attributes.getNamedItem("data-render-artist") !== null) {
      let clickedValueArtist = JSON.parse(
        e.target.attributes.getNamedItem("data-render-artist").value
      );

      setCurrentArtist(clickedValueArtist);
    }

    // Look at the clicked element and determine their types, then update the context with the element's connected data
    // ALBUM
    if (e.target.attributes.getNamedItem("data-render-album") !== null) {
      let clickedValueAlbum = JSON.parse(
        e.target.attributes.getNamedItem("data-render-album").value
      );

      setCurrentAlbum(clickedValueAlbum);
    }
  }

  return (
    <div id="root">
      <SearchBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        maxwidth="xs"
        onClick={resultsClickHandler}
      >
        {searchResults
          ? searchResults.map((obj) => {
              return obj.type === "song"
                ? renderSong(obj)
                : obj.type === "artist"
                ? renderArtist(obj)
                : obj.type === "album"
                ? renderAlbum(obj)
                : null;
            })
          : null}
      </Grid>
    </div>
  );
}
