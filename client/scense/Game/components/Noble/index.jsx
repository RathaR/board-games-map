import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';

const BLOCK = 'noble';
class Noble extends Component {
  state = {
  };

  render() {
    const {type} = this.props;
    const blockClasses = classNames(`${BLOCK}`, {[`${BLOCK}--reserved`]: type === 'Reserved'});
    const statsClasses = classNames(`${BLOCK}__stats`, {[`${BLOCK}__stats--reserved`]: type === 'Reserved'});

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__title`}>
        Noble
      </div>
      <div className={`${BLOCK}__prestige`}>
        1
      </div>
      <div className={statsClasses}>
        {[1,2,3].map((elem, index) => <div key={index} className={`${BLOCK}__bonus`}>2</div>)}
      </div>
    </div>);
  }
}

Noble.propTypes = {
  className: PropTypes.string
};

export default Noble;


