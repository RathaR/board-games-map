import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';
import TokensStack from '../TokensStack';
import Bonus from '../Bonus';
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

    const bonusColors = [
      COLORS.BLUE,
      COLORS.BLACK,
      COLORS.GREEN,
      COLORS.RED,
      COLORS.WHITE];
    const bonuses = bonusColors
      .filter(color => getAmount(color) > 0)
      .map((colour, index) => (
        <div key={index} className={`${BLOCK}__bonus-container`}>
          <Bonus amount={getAmount(colour)} color={colour} />
        </div>));

    return (<div className={`${BLOCK}__bonuses`}>
      {bonuses}
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

  getPoints() {
    const {playerInformation: {cards}, getCard} = this.props;

    return cards.map(id => getCard(id)).reduce((acc, curr) => {
      return acc + curr.prestige;
    }, 0)
  }

  render() {
    const {playerInformation: {id}, isActive} = this.props;
    const blockClasses = classNames(BLOCK,{[`${BLOCK}--active-player`]: isActive} );

    return (<div className={blockClasses}>
      <div className={`${BLOCK}__stats`}>
        <div className={`${BLOCK}__title`}>{id}</div>
        <div className={`${BLOCK}__prestige`}>Points: {this.getPoints()}</div>
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


