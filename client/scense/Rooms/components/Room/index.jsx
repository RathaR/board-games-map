import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './styles.scss';
const BLOCK = 'room';
const Room = function ({room}) {
  return(
    <div className={BLOCK}>
      <div className={`${BLOCK}__players`}>
        {room.players} Players
      </div>
      <div className={`${BLOCK}__actions`}>
        <div className={`${BLOCK}__action`}>
          <Link to={`/room/${room.id}`}>Open</Link>
        </div>
      </div>
    </div>
  );
};

export default Room;
