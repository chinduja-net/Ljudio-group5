import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Grid, Container, Button, IconButton } from "@material-ui/core";

import { SearchContext } from "../context/SongProvider";
import SearchBar from "../components/SearchBar";
//import style from "../styles/SearchResults.module.css"

function SearchResults() {
  const {
    searchResults,
    setCurrentSong,
    setCurrentAlbum,
    setCurrentArtist,
    currentSong,
    currentAlbum,
    currentArtist,
    setSongDetail,
  } = useContext(SearchContext);

  const history = useHistory();

  function renderSong(object) {
    return (
      <Grid
	 
        data-render-song={JSON.stringify(object)}
        data-render-details={JSON.stringify(object)}
        key={object.id}
      >
        <img
          data-render-song={JSON.stringify(object)}
          src={object.thumbnails[0].url}
          alt={object.artist + "'s cover thumbnail"}
        />
        {/* <div data-render-song={JSON.stringify(object)}> */}
        <h4 data-render-song={JSON.stringify(object)}>{object.name}</h4>
        {/* <p data-render-song={JSON.stringify(object)}>{object.artist}</p> */}
        {/* </div> */}
        <Button variant = "contained" type="click" onClick={showSongDetails}>
          song details
        </Button>
      </Grid>
    );
  }

  function renderArtist(object) {
    return (
      <Grid
	 
	 data-render-artist={JSON.stringify(object)} key={object.id}>
        <p data-render-artist={JSON.stringify(object)}>{object.type}</p>
        <img
          data-render-artist={JSON.stringify(object)}
          src={object.thumbnails[0].url}
          alt={object.name + "'s cover thumbnail"}
        />
        <h3 data-render-artist={JSON.stringify(object)}>{object.name}</h3>
      </Grid>
    );
  }
  function renderAlbum(object) {
    return (
      <Grid 
	   data-render-album={JSON.stringify(object)} key={object.id}>
        <img
          data-render-album={JSON.stringify(object)}
          src={object.thumbnails[0].url}
          alt={object.artist + "'s cover thumbnail"}
        />

        <h4 data-render-album={JSON.stringify(object)}>{object.name}</h4>
        <p data-render-album={JSON.stringify(object)}>{object.artist}</p>
      </Grid>
    );
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
      console.log("parsed SONG_DETAILS: ", clickedDetailSong);

      setSongDetail(clickedDetailSong);

      history.push("/detailsPage");
    }
  }

  function resultsClickHandler(e) {
    console.log("______________________");

    /** This part could be used to find all the child nodes of an element in hopes of making a cleaner solution to the problem*/
    // If the user clicks on a result card
    // or any of the result card's child nodes

    // ! This solution may not work with material ui components since the IF statement searches for a DIV

    // ? Element.matches("selectorString") could be used to find parent element of e.target

    // let addedChildNodes = []
    // let directChildNodes = [...e.target.childNodes]
    // directChildNodes.forEach((node) => {
    // 	if (node.tagName === "DIV") addedChildNodes = [...node.childNodes]
    // })
    // directChildNodes = [...directChildNodes, ...addedChildNodes]
    // console.log("COMPLETED CHILDNODES: ", directChildNodes)

    if (e.target.attributes.getNamedItem("data-render-song") !== null) {
      let clickedValueSong = JSON.parse(
        e.target.attributes.getNamedItem("data-render-song").value
      );
      console.log("parsed SONG: ", clickedValueSong);

      setCurrentSong(clickedValueSong);

      history.push("/playerPage");
    }

    // Look at the clicked element and determine their types, then update the context with the element's connected data
    // ARTIST
    if (e.target.attributes.getNamedItem("data-render-artist") !== null) {
      let clickedValueArtist = JSON.parse(
        e.target.attributes.getNamedItem("data-render-artist").value
      );
      console.log("parsed ARTIST: ", clickedValueArtist);

      setCurrentArtist(clickedValueArtist);
    }

    // Look at the clicked element and determine their types, then update the context with the element's connected data
    // ALBUM
    if (e.target.attributes.getNamedItem("data-render-album") !== null) {
      let clickedValueAlbum = JSON.parse(
        e.target.attributes.getNamedItem("data-render-album").value
      );
      console.log("parsed ALBUM: ", clickedValueAlbum);

      setCurrentAlbum(clickedValueAlbum);
    }

    // ! Maybe a bug, the context doesn't seem to update instantly because it's always logging the PREVIOUS context value
    console.log("currentSong Context: ", currentSong);
    console.log("currentAlbum Context: ", currentAlbum);
    console.log("currentArtist Context: ", currentArtist);
  }

  return (
    <div id="root">
      <h5>SearchResults</h5>
      <SearchBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        maxwidth="xs"
        style={{
          background: "#FFEED3",
        }}
        onClick={resultsClickHandler}
      >
        {searchResults // When looping through the search results we can limit the loop with user input
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

export default SearchResults;
