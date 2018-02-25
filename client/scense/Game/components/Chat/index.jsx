import React, { Component } from 'react';
import './styles.scss'
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BLOCK = 'chat';

class Chat extends Component {
  state = {
  };

  render() {
    const blockClasses = classNames(`${BLOCK}`, this.props.className);
    return (<div className={blockClasses}>
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


