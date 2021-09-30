import React from 'react';

import { styled } from '@mui/system/';
import PlayLists from './PlayLists';

import ModalUnstyled from '@mui/core/ModalUnstyled/';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(166, 185, 255, 1);
  -webkit-tap-highlight-color: transparent;
`;

function PlaylistModal({ handlePlaylistClose, playlistModalOpen }) {
  return (
    <StyledModal
      open={playlistModalOpen}
      onClose={handlePlaylistClose}
      BackdropComponent={Backdrop}
    >
      <PlayLists />
    </StyledModal>
  );
}

export default PlaylistModal;
