import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from "react";
import { loginFetch } from "../services/authService";
import { useHistory } from "react-router";


const theme = createTheme();

export default function Login() {

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
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                            
              <Grid item xs={12}>
                <TextField
                   autoComplete="Uname"
                   name="UserName"
                   required
                   fullWidth
                   id="UserName"
                   label="UserName"
                   autoFocus
                   onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
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

 //To verify if the user is logged in
//can be used to give access to make playlists etc...

/*
function getToken() {
    return sessionStorage.getItem("auth");
  }
 async function isLoggedIn() {
    const token = getToken();
    const response = await fetch('http://localhost:3000/api/staff/loggedin', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
  
     if (!data.loggedIn) {
      location.href = 'http://localhost:3000/login.html';
    } 
    }
  
  isLoggedIn() */