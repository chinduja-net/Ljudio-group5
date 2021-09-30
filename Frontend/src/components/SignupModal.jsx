import React, { useState } from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import Button from "@mui/material/Button";
import { deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import SignUp from "./signUp";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[700]),
  backgroundColor: deepPurple[700],
  "&:hover": {
    backgroundColor: deepPurple[300],
  },
}));
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

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(166, 185, 255, 1);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

export default function SignupModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ColorButton variant="contained" onClick={handleOpen} size="small">
        SIGN UP
      </ColorButton>

      <StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <SignUp handleClose={handleClose} />
        </Box>
      </StyledModal>
    </div>
  );
}
