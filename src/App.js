import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import './App.css';
import Search from './Search';
import Favorites from './Favorites';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

export default class App extends Component {

  state = { user: null }

  setUser = user => {
    this.setState({ user: user.body });
  }

  render() {
    return (
      <div className="App">
        <header><h1>Search Your Favorite Rick And Morty Character</h1></header>

        <Router>
          <div className="nav">
            <Link to="/favorites">Favorites</Link>
            <Link to="/">Search</Link>
            <Link to="/login">Login</Link>
          </div>
          <Switch>

            <PrivateRoute exact path="/" component={Search} user={this.state.user} />

            <PrivateRoute exact path="/favorites" component={Favorites} user={this.state.user} />

            <Route exact path="/login" render={(props) => <Login {...props} setUser={this.setUser} user={this.state.user} />} />
          </Switch>

        </Router>
      </div>
    );
  }
}