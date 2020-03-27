import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'

import Routes from './routes';
import { setMessage } from './store/appReducer';

class App extends Component {
  componentDidMount() {
    if(!this.props.message) {
      this.props.updateMessage("Hi, I'm from client!");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React </h1>
        </header>
        <div className="App-intro">
          <h2>Part 1: Async component</h2>
          <h2>Part 2: Redux store</h2>
          <p>Redux: { this.props.message }</p>
          <hr />
          <h2>Part 3: React router</h2>
          <nav>
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
            <NavLink to="/another" activeClassName="active">Another page</NavLink>
          </nav>
          <Routes />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ app }) => ({ message: app.message, }),
    dispatch => ({ updateMessage: (messageText) => dispatch(setMessage(messageText)), })
  )(hot(App))
);
