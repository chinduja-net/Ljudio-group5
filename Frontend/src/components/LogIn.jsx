import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { loginFetch } from "../services/authService";
import { useHistory } from "react-router";

const theme = createTheme();

export default function Login({ handleClose }) {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userName, password);
  };

  function saveToken(token) {
    return new Promise((resolve, reject) => {
      sessionStorage.setItem("auth", token);

      resolve("Done");
    });
  }

  async function login(userName, password) {
    const obj = {
      userName,
      password,
    };
    try {
      const data = await loginFetch(obj);
      if ((data.success = false)) {
        console.log("Wrong Credentials");
        history.push("/signup");
      } else {
        await saveToken(data.token);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Uname"
                  name="UserName"
                  required
                  id="UserName"
                  label="UserName"
                  autoFocus
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
