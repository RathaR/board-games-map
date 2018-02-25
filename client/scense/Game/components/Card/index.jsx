import React, { Component } from 'react';
import './styles.scss'
import PropTypes from  'prop-types';
import classNames from 'classnames';

const BLOCK = 'card';

class Card extends Component {
  state = {
  };

  render() {
    const {type} = this.props;
    const blockClasses = classNames(`${BLOCK}`, {[`${BLOCK}--reserved`]: type === 'Reserved'});
    const costTokenClasses = classNames(`${BLOCK}__cost-token`, {[`${BLOCK}__cost-token--reserved`]: type === 'Reserved'});

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__title`}>
        {this.props.type}
      </div>
      <div className={`${BLOCK}__cost`}>
        {[1,2,3,4].map((elem, index) => <div className={costTokenClasses} key={index}>{index}</div> )}
      </div>
    </div>);
  }
}

Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Card;


