import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MiniPlayer from './components/MiniPlayer';

import Routes from './routes/Index';

function App() {
  return (
    <>
      <Router>
        <Routes />
        <MiniPlayer />
      </Router>
    </>
  );
}

export default App;
