import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PlayerPage from './routes/PlayerPage';
import Player from './components/player';
import SearchBar from './components/SearchBar';
import SearchResults from './routes/SearchResults';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Router>
        <nav>
          <Link to="/PlayerPage">Player Page</Link>
        </nav>
        <Switch>
          <Route path="/PlayerPage">
            <PlayerPage />
          </Route>
        </Switch>
      </Router>
      <SearchResults />
    </div>
  );
}

export default App;
