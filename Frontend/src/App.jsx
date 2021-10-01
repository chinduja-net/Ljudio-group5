import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import BottomNavLinks from './components/BottomNavLinks';
import Routes from './routes/Index';
import MiniPlayer from './components/MiniPlayer';
import YoutubePlayer from './components/YoutubePlayer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem',
  },
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <YoutubePlayer />
          <Routes />
          <MiniPlayer />
          <BottomNavLinks />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
