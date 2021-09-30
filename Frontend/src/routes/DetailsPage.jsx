import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import QueueIcon from "@mui/icons-material/Queue";
import IconButton from "@mui/material/IconButton";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { Typography } from "@mui/material";
import Box from "@mui/system/Box";

import PlaylistModal from "../components/PlaylistModal";

import { SearchContext } from "../context/SongProvider";

function DetailsPage() {
  const {
    songDetail,
    addObjToArray,
    playList,
    handlePlaylistOpen,
    handlePlaylistClose,
    playlistModalOpen,
  } = useContext(SearchContext);
  const history = useHistory();

  function addToQueue() {
    addObjToArray(songDetail);
    history.push("/searchResults");
  }

  function addSongToPlaylist() {
    handlePlaylistOpen();
  }
  return (
    <>
      <PlaylistModal
        handlePlaylistClose={handlePlaylistClose}
        playlistModalOpen={playlistModalOpen}
      />
      {songDetail.name ? (
        <Box
          maxWidth="xs"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            height: 500,
            flexDirection: "column",
          }}
        >
          <img
            src={songDetail.thumbnails[1].url}
            alt={songDetail.artist.name + "'s cover thumbnail"}
          />
          <Typography fontSize="small" variant="h5">
            {songDetail.name}
          </Typography>
          <div>
            <Box>
              <IconButton type="click" onClick={addToQueue}>
                <QueueIcon fontSize="large" />
              </IconButton>
            </Box>
            <Box>
              <IconButton type="click" onClick={addSongToPlaylist}>
                <PlaylistAddOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
          </div>
        </Box>
      ) : (
        <div>
          <Typography variant="h6">
            You need to search for something first, go back to the home page.
          </Typography>
        </div>
      )}
    </>
  );
}

export default DetailsPage;
