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
import { createAccountFetch } from "../services/authService";
import { useHistory } from "react-router";


const theme = createTheme();

export default function SignUp() {

  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount(userName, password);
    
  };

  async function createAccount(userName, password) {
    const obj = {
      userName,
      password,
    };
    try {
      const data = await createAccountFetch(obj);

      if (data) {

            console.log(data);
            history.push('/Home');
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
            Sign up
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
              Create Account
            </Button>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}