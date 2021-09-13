import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchResults from './SearchResults';
import PlayerPage from './PlayerPage';
import Home from './Home';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/SearchResults">
        <SearchResults />
      </Route>
      <Route path="/PlayerPage">
        <PlayerPage />
      </Route>
      {/* <Route path="/QueueViewer">
					<QueueViewer />
				</Route> */}
    </Switch>
  );
}

export default Routes;
