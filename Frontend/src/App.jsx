import React from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import SearchResults from "./routes/SearchResults";
import QueueViewer from "./routes/QueueViewer";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <SearchResults />
      <QueueViewer />
    </div>
  );
}

export default App;
