import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import './styles.scss';
import Game from './scense/Game';
import {Provider} from 'react-redux';
import {playersSelector} from './selectors/commmon';

const mapStateToProps = state => {
  return {
    players: playersSelector(state),
  }
};

const mapDispatchToProps = dispatch => ({});

const ConnectedGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

const App = ({store}) => (
  <Provider store={store}>
    <div className='app'>
      <ConnectedGame/>
    </div>
  </Provider>);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
