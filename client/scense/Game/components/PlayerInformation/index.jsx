import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';
import TokensStack from '../TokensStack';
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
        {tokens.filter(token => token.amount >0).map(
          (token, index) =>
            <div key={index} className={`${BLOCK}__token-container`}>
              <TokensStack amount={token.amount} colour={token.colour} isSelectable={false} minimized/>
            </div>)}
      </div>)
  }


  renderBonuses() {
    const {playerInformation: {cards}, getCard} = this.props;

    const getAmount = function(colour) {

      const res =  cards.map(getCard).reduce((acc, curr)=> {
        if(curr.bonus === colour) {
          return acc + 1;
        }
        return acc;
      }, 0);
      return res;
    };

    return (
      <div className={`${BLOCK}__bonuses`}>
        {[COLORS.BLUE, COLORS.BLACK, COLORS.GREEN,  COLORS.RED, COLORS.WHITE ].map(
          (colour, index) =>
            <div key={index} className={`${BLOCK}__bonus-container`}>
              {!!getAmount(colour) && <Bonus amount={getAmount(colour)} color={colour} />}
            </div>)}
      </div>)
  }

  renderReservedCards() {
    const {playerInformation: {reserve}, getCard} = this.props;

    return (
      <div className={`${BLOCK}__reserved-cards`}>
        {reserve.map(
          (cardId) =>
            <div key={cardId} className={`${BLOCK}__reserved-card-container`}>
              <Card type='Reserved' className='card--reserved' card={getCard(cardId)}/>
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


