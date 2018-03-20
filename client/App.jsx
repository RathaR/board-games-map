import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import {Provider} from 'react-redux';
import Main from './scense/Main';
import Navigation from './scense/Navigation';

const App = ({store}) => (
  <Provider store={store}>
    <div className='app'>
      <Navigation />
      <Main />
    </div>
  </Provider>);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
