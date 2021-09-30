import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import BottomNavLinks from './components/BottomNavLinks';
import Routes from './routes/Index';
import MiniPlayer from './components/MiniPlayer';
import YoutubePlayer from './components/YoutubePlayer';

function App() {
  return (
    <>
      <Router>
        <YoutubePlayer />
        <Routes />
        {location.pathname !== "/playerPage"? <MiniPlayer />: null}
        <BottomNavLinks />
      </Router>
    </>
  );
}

export default App;
