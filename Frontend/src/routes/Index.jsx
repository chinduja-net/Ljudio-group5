import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchResults from './SearchResults';
import Home from './Home';
import DetailsPage from './DetailsPage';
import QueueViewer from './QueueViewer';
import PlayerPage from './PlayerPage';

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
      <Route path="/queueViewer">
        <QueueViewer />
      </Route>
      <Route path="/playerPage">
        <PlayerPage />
      </Route>
    </Switch>
  );
}

export default Routes;
