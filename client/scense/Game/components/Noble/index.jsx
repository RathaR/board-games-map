import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';

const BLOCK = 'noble';
class Noble extends Component {
  state = {
  };

  render() {
    const blockClasses = classNames(`${BLOCK}`, this.props.className);
    return (<div className={blockClasses}>
      Noble
    </div>);
  }
}

Noble.propTypes = {
  className: PropTypes.string
};

export default Noble;


