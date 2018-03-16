import {playersSelector} from '../selectors/commmon';
import {playerTokensSelector, playerBonusesSelector} from '../selectors/player';
import {cardSelector, cardCostSelector} from '../selectors/cards';

export const getMissingTokens = function(state, playerId, cardId) {
  const playerTokens = playerTokensSelector(state)(playerId);
  const playerBonuses = playerBonusesSelector(state)(playerId);
  const cardCost = cardCostSelector(state)(cardId);
  
  const missingTokens = cardCost.reduce((acc, curr) => {
    const availableTokens = playerTokens.filter(token => token.colour === curr.color)[0].amount;
    const availableBonus = playerBonuses.find(bonus => bonus.bonus === curr.colour);
    const bonusAmount = availableBonus ? availableBonus.amount : 0;
    if (curr.amount > availableTokens + bonusAmount) {
      acc.push({color: curr.color, amount: curr.amount - availableTokens + bonusAmount});
    }
    return acc;
  }, []);

  return missingTokens;
};

