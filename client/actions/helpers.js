import {playersSelector} from '../selectors/common';
import {playerTokensSelector, playerBonusesSelector, playerSelector} from '../selectors/player';
import {cardSelector, cardCostSelector} from '../selectors/cards';

export const getMissingTokens = function(state, playerId, cardId)
{
  const player = playerSelector(playerId)(state);
  const playerTokens = playerTokensSelector(player);
  const playerBonuses = playerBonusesSelector(playerId)(state);
  const card = cardSelector(cardId)(state);
  const cardCost = cardCostSelector(card);
  
  const missingTokens = cardCost.reduce((acc, curr) => {
    const availableTokens = playerTokens.find(token => token.color === curr.color).amount;
    const availableBonus = playerBonuses.find(bonus => bonus.color === curr.color);
    const bonusAmount = availableBonus ? availableBonus.amount : 0;
    if (curr.amount > availableTokens + bonusAmount) {
      acc.push({color: curr.color, amount: curr.amount - availableTokens + bonusAmount});
    }
    return acc;
  }, []);

  return missingTokens;
};

export const comingNobles = function(nobles, availableBonuses) {
  const result = [];
  nobles.reduce((acc, curr) => {
    const neededBonuses = curr.bonuses;
    let result = true;
    neededBonuses.forEach(neededBonus => {
      const availableBonus = availableBonuses.find(availableBonus => availableBonus.color === neededBonus.color);
      if(!availableBonus || availableBonus.amount < neededBonus.amount) {
        result = false;
      }
    });
    if(result) {
      acc.push(curr);
    }
    return acc;
  }, result);
  return result;
};
