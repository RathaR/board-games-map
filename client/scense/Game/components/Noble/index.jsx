import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';

const BLOCK = 'noble';
class Noble extends Component {
  state = {
  };

  render() {
    const {type, noble} = this.props;
    const {bonuses, prestige} = noble;
    const blockClasses = classNames(`${BLOCK}`, {[`${BLOCK}--reserved`]: type === 'Reserved'});
    const statsClasses = classNames(`${BLOCK}__stats`, {[`${BLOCK}__stats--reserved`]: type === 'Reserved'});
  debugger;
    return (<div className={blockClasses}>
      <div className={`${BLOCK}__title`}>
        Noble
      </div>
      <div className={`${BLOCK}__prestige`}>
        {prestige}
      </div>
      <div className={statsClasses}>
        {Object.keys(bonuses).map((color, index) => <div key={index} className={`${BLOCK}__bonus`}>{bonuses[color]}</div>)}
      </div>
    </div>);
  }
}

Noble.propTypes = {
  className: PropTypes.string,
  noble: PropTypes.object,
};

export default Noble;


