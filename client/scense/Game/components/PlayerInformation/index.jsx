import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Token from '../Token';
import Bonus from './components/Bonus';
import Card from '../Card';
import Noble from '../Noble';

const BLOCK = 'player-information';

class PlayerInformation extends Component {
  state = {};

  renderTokens() {
    return (
      <div className={`${BLOCK}__tokens`}>
        {[1,2,3,4,5,6].map(
          (elem, index) =>
            <div key={index} className={`${BLOCK}__token-container`}>
              <Token className={`token--minimized`} />
            </div>)}
      </div>)
  }

  renderBonuses() {
    return (
      <div className={`${BLOCK}__bonuses`}>
        {[1,2,3,4,5].map(
          (elem, index) =>
            <div key={index} className={`${BLOCK}__bonus-container`}>
              <Bonus />
            </div>)}
      </div>)
  }

  renderReservedCards() {
    return (
      <div className={`${BLOCK}__reserved-cards`}>
        {[1,2,3].map(
          (elem, index) =>
            <div key={index} className={`${BLOCK}__reserved-card-container`}>
              <Card type='Reserved' className='card--reserved'/>
            </div>)}
      </div>)
  }

  renderNobles() {
    const {playerInformation: {nobles}} = this.props;
    return (
      <div className={`${BLOCK}__nobles`}>
        {nobles.map(
          (noble, index) =>
            <div key={index} className={`${BLOCK}__noble-container`}>
              <Noble noble={noble} />
            </div>)}
      </div>)
  }

  renderPlayerName() {
    const {playerInformation: {id}} = this.props;

    return (<div className={`${BLOCK}__title`}>
      {id}
    </div>)
  }

  render() {
    debugger;
    return (<div className={`${BLOCK}`}>
      <div>
        {this.renderPlayerName()}
        {this.renderTokens()}
        {this.renderBonuses()}
      </div>
      <div>
        {this.renderReservedCards()}
        {this.renderNobles()}
      </div>
    </div>);
  }
}

PlayerInformation.propTypes = {
  playerInformation: PropTypes.object,
};

export default PlayerInformation;


