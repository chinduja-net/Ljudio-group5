import React from "react";
import { Switch, Route } from "react-router-dom";

import SearchResults from "./SearchResults";
import PlayerPage from "./PlayerPage";
import Home from "./Home";
import DetailsPage from "./DetailsPage";
import QueueViewer from "./QueueViewer";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/searchResults">
        <SearchResults />
      </Route>
      <Route path="/detailsPage">
        <DetailsPage />
      </Route>
      <Route path="/playerPage">
        <PlayerPage />
      </Route>
      <Route path="/queueViewer">
        <QueueViewer />
      </Route>
    </Switch>
  );
}

export default Routes;
