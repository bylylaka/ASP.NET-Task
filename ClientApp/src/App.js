import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';

export default class App extends Component {

  render() {
    return (
        <Route exact path='/' component={Home} />
    );
  }
}
