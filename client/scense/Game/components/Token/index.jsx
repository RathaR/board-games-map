import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss'

const BLOCK = 'token';
class Token extends Component {
  state = {
  };

  render() {
    const blocClasses = classNames(this.props.className, `${BLOCK}`);
    return (<div className={blocClasses}>
      <div className={`${BLOCK}__icon`}>
        <div className={`${BLOCK}__amount`}>
          4
        </div>
      </div>
    </div>);
  }
}

Token.propTypes = {
  className: PropTypes.string,
};

export default Token;


