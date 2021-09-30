import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from './routes/Index';

import MiniPlayer from './components/MiniPlayer';
import YoutubePlayer from './components/YoutubePlayer';

function App() {
  return (
    <>
      <Router>
        <YoutubePlayer />
        <Routes />
        <MiniPlayer />
      </Router>
    </>
  );
}

export default App;
