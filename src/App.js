import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'
import AlbumPicker from './components/AlbumPicker'
import Login from './components/Login'
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
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
          </ul>
        </nav>

        <Switch>
          <Route path="/AlbumPicker">
            <AlbumPicker />
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
