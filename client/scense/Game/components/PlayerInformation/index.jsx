import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';
import Token from '../Token';
import Bonus from './components/Bonus';
import Card from '../Card';
import {COLORS} from '../../../../constants/common';

const BLOCK = 'player-information';

class PlayerInformation extends Component {
  state = {};

  renderTokens() {
    const {playerInformation: {tokens}} = this.props;

    return (
      <div className={`${BLOCK}__tokens`}>
        {Object.keys(tokens).map(
          (color, index) =>
            <div key={index} className={`${BLOCK}__token-container`}>
              <Token amount={tokens[color]} color={color} className={`token--minimized`} />
            </div>)}
      </div>)
  }

  renderBonuses() {
    return (
      <div className={`${BLOCK}__bonuses`}>
        {[COLORS.BLUE, COLORS.BLACK, COLORS.GREEN,  COLORS.RED, COLORS.WHITE ].map(
          (elem, index) =>
            <div key={index} className={`${BLOCK}__bonus-container`}>
              <Bonus amount={1} color={elem} />
            </div>)}
      </div>)
  }

  renderReservedCards() {
    const {playerInformation: {reserve}} = this.props;

    return (
      <div className={`${BLOCK}__reserved-cards`}>
        {reserve.map(
          (card, index) =>
            <div key={index} className={`${BLOCK}__reserved-card-container`}>
              <Card type='Reserved' className='card--reserved' card={card}/>
            </div>)}
      </div>)
  }

  render() {
    const {playerInformation: {id, prestige}, isActive} = this.props;
    const blockClasses = classNames(BLOCK,{[`${BLOCK}--active-player`]: isActive} );

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__stats`}>
        <div className={`${BLOCK}__title`}>{id}</div>
        <div className={`${BLOCK}__prestige`}>Points: {prestige}</div>
      </div>
      <div className={`${BLOCK}__main`}>
        <div className={`${BLOCK}__left-container`}>
          {this.renderTokens()}
          {this.renderBonuses()}
        </div>
        <div className={`${BLOCK}__right-container`}>
          {this.renderReservedCards()}
        </div>
      </div>
    </div>);
  }
}

PlayerInformation.propTypes = {
  playerInformation: PropTypes.object,
  isActive: PropTypes.bool,
};

export default PlayerInformation;


