import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from '../../../../../Card';

const BLOCK = 'reserved-cards';
const ReservedCards =  function({playerInformation: {reserve, id}, getCard, onCardBuy, className, activePlayer}) {
  return (
    <ReactCSSTransitionGroup
      className={classNames(BLOCK, className)}
      component="div"
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      {reserve.map(
        (cardId) =>
          <div key={cardId} className={`${BLOCK}__reserved-card-container`}>
            <Card type='Reserved' canBuy={activePlayer === id} className='card--reserved' card={getCard(cardId)} onBuyClick={onCardBuy}/>
          </div>)}
    </ReactCSSTransitionGroup>)
};

ReservedCards.propTypes = {

};

export default ReservedCards;
