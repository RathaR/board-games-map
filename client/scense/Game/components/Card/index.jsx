import React, { Component } from 'react';
import './styles.scss'
import PropTypes from  'prop-types';
import classNames from 'classnames';

const BLOCK = 'card';

class Card extends Component {
  state = {
  };

  render() {
    const blockClasses = classNames(`${BLOCK}`, this.props.className);
    return (<div className={blockClasses}>
      {this.props.type}
    </div>);
  }
}

Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Card;


