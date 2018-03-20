import React, {Component} from 'react';
import './styles.scss';
const BLOCK = 'room';
const Room = function ({room}) {
  return(
    <div className={BLOCK}>
      <div className={`${BLOCK}__id`}>
        {room.id}
      </div>
      <div className={`${BLOCK}__actions`}>
        <div className={`${BLOCK}__action`}><a href="/">Observe</a></div>
        <div className={`${BLOCK}__action`}><a href="/">Join</a></div>
      </div>
    </div>
  );
};

export default Room;
