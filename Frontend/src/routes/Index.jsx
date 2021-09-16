import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchResults from './SearchResults';
import Home from './Home';
import DetailsPage from './DetailsPage';

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
      {/* <Route path="/QueueViewer">
					<QueueViewer />
				</Route> */}
    </Switch>
  );
}

export default Routes;
