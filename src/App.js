import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'
import AlbumPicker from './components/AlbumPicker'
import ArtistPicker from './components/ArtistPicker'
import Login from './components/Login'
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
  credentials: 'include'
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Login />
            </li>
            <li>
              <Link to="/AlbumPicker">Album Picker</Link>
            </li>
            <li>
              <Link to="/ArtistPicker">Artist Picker</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/AlbumPicker">
            <AlbumPicker />
          </Route>
          <Route path="/ArtistPicker">
            <ArtistPicker />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
