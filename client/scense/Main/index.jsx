import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './styles.scss';
import Game from '../Game';
import Rules from '../Rules';
import Rooms from '../Rooms';

const Main = function () {
  return(
    <div>
      <Route path="/rules" component={Rules}/>
      <Route path="/rooms" component={Rooms}/>
      <Route path="/room/:id" component={Game}/>
    </div>
  );
};

export default Main;
