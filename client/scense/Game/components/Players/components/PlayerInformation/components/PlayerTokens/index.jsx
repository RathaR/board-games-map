import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';
import TokensStack from '../../../../../TokensStack';

const BLOCK = 'player-tokens';
const PlayerTokens =  function({ tokens, className}) {
  const _tokens = tokens
    .filter(token => token.amount > 0)
    .map((token, index) =>
      <div key={index} className={`${BLOCK}__token-container`}>
        <TokensStack amount={token.amount} color={token.color} isSelectable={false} minimized/>
      </div>);

  return (
    <div className={classNames(BLOCK, className)}>
    {_tokens}
  </div>)
};

PlayerTokens.propTypes = {

};

export default PlayerTokens;
