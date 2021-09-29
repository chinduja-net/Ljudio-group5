import React from "react";
import { Switch, Route } from "react-router-dom";

import SearchResults from "./SearchResults";
import Home from "./Home";
import DetailsPage from "./DetailsPage";
import QueueViewer from "./QueueViewer";
import SearchBar from "../components/SearchBar";
import PlayLists from "../components/PlayLists";
import PlayerPage from "../routes/PlayerPage";
import PlayListViewer from "./PlayListViewer";
import CreatePlaylistForm from "../components/CreatePlaylistForm";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/searchBar">
        <SearchBar />
      </Route>
      <Route path="/playLists">
        <PlayLists />
      </Route>
      <Route path="/createPlaylistForm">
        <CreatePlaylistForm />
      </Route>
      <Route path="/playListView">
        <PlayListViewer />
      </Route>
      <Route path="/searchResults">
        <SearchResults />
      </Route>
      <Route path="/detailsPage">
        <DetailsPage />
      </Route>
      <Route path="/queueViewer">
        <QueueViewer />
      </Route>
      <Route path="/PlayerPage">
        <PlayerPage />
      </Route>
    </Switch>
  );
}

export default Routes;
