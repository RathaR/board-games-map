import React, {Component} from 'react';
import {connect} from 'react-redux';
import Room from './components/Room';

import './styles.scss';
import {roomsSelector} from "../../selectors/common";

const Rooms = function ({rooms}) {
  return(
    <div>
      {rooms.map(room => <Room key={room.id} room={room}/>)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: roomsSelector(state),
  }
};

const mapDispatchToProps = dispatch => ({});

const ConnectedRooms = connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);

export default ConnectedRooms;
