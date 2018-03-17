import {playersSelector} from '../selectors/commmon';
import {tokensSelector, playerBonusesSelector, playerSelector} from '../selectors/player';
import {cardSelector, cardCostSelector} from '../selectors/cards';

export const getMissingTokens = function(state, playerId, cardId)
{
  const player = playerSelector(playerId)(state);
  const playerTokens = tokensSelector(player);
  const playerBonuses = playerBonusesSelector(playerId)(state);
  const card = cardSelector(cardId)(state);
  const cardCost = cardCostSelector(card);
  
  const missingTokens = cardCost.reduce((acc, curr) => {
    const availableTokens = playerTokens.filter(token => token.color === curr.color)[0].amount;
    const availableBonus = playerBonuses.find(bonus => bonus.bonus === curr.color);
    const bonusAmount = availableBonus ? availableBonus.amount : 0;
    if (curr.amount > availableTokens + bonusAmount) {
      acc.push({color: curr.color, amount: curr.amount - availableTokens + bonusAmount});
    }
    return acc;
  }, []);

  return missingTokens;
};

