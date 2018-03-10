import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BLOCK = 'game-log';

class GameLog extends Component {
  state = {
  };

  render() {
    const blockClasses = classNames(`${BLOCK}`, this.props.className);
    return (<div className={blockClasses}>
      <div className={`${BLOCK}__title`}>
        Game log
      </div>
      <ul className={`${BLOCK}__events-list`}>
        <li className={`${BLOCK}__events-list-item`}>Game started!</li>
      </ul>
    </div>);
  }
}

GameLog.propTypes = {
  className: PropTypes.string,
  events: PropTypes.array,
};

export default GameLog;


