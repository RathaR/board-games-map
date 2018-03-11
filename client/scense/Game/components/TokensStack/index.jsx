import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';
import Token from "./сomponents/Token";

const BLOCK = 'tokens-stack';
class TokensStack extends Component {

  constructor(props) {
    super(props);

    this.handleSelection = this.handleSelection.bind(this);
  }
  handleSelection() {

    const {isSelectable, colour} = this.props;
    if(!isSelectable) {
      return;
    }

    this.props.onSelected(colour);
  }

  render() {
    const {amount, colour, minimized, isSelected} = this.props;
    const blockClasses = classNames(BLOCK, {
      [`${BLOCK}--minimized`]: minimized,
      [`${BLOCK}--selected`]: isSelected});
    const tokens = [];

    for(let i = 0; i < amount; i++) {
      tokens.push(<Token key={i} color={colour} amount={amount} minimized={minimized} onSelected={this.handleSelection} isSelected={isSelected && (i === amount -1) } />)
    }
    return(<div className={blockClasses}>
      {tokens}
    </div>);
  }
}

TokensStack.propTypes = {
  className: PropTypes.string,
  colour: PropTypes.string,
  amount: PropTypes.number,
  isSelected: PropTypes.bool,
  isSelectable: PropTypes.bool,
  onSelected: PropTypes.func,
  minimized: PropTypes.bool,
};

export default TokensStack;


