import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import PlayerInformation from './components/PlayerInformation';
import classNames from 'classnames';

const BLOCK = 'players';

const Players = function({players, className}) {
  return (
    <div className={classNames( BLOCK, className)}>
      {players.map(playerInformation =>
        <div key={playerInformation.id} className={`${BLOCK}__player-information-container`}>
          <PlayerInformation
            playerInformation={playerInformation} />
        </div>)}
    </div>);
};

export default Players;
