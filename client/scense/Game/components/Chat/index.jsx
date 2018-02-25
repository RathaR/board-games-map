import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import className from 'classnames';

const BLOCK = 'chat';

class Chat extends Component {
  state = {
  };

  render() {
    return (<div className={`${BLOCK} ${this.props.className}`}>
      <div className={`${BLOCK}__title`}>
        Chat
      </div>
    </div>);
  }
}

Chat.propTypes = {
  className: PropTypes.string,
};

export default Chat;


