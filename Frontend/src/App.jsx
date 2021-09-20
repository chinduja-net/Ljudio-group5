import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import YoutubePlayer from "./components/YoutubePlayer";

import Routes from "./routes/Index";

function App() {
  return (
    <>
      <Router>
        <Routes />
        <YoutubePlayer/>
      </Router>
    </>
  );
}

export default App;
