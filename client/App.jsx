import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import {Provider} from 'react-redux';
import Navigation from './scense/Navigation';
import { BrowserRouter, Route } from 'react-router-dom'
import Game from './scense/Game';
import Rules from './scense/Rules';
import GamesList from './scense/GamesList';

const App = ({store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className='app'>
        <Navigation />
        <div>
          <Route path="/rules" component={Rules}/>
          <Route path="/games" component={GamesList}/>
          <Route path="/game/:id" component={Game}/>
        </div>
      </div>
    </BrowserRouter>
  </Provider>);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
