import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import Noble from './components/Noble';

const BLOCK = 'nobles-list';
const NoblesList = function({nobles}) {
    return (
      <div className={`${BLOCK}`}>
        {nobles.map(
          (noble, index) => <Noble key={index} noble={noble}/>)}
      </div>);
  };

NoblesList.propTypes = {
  nobles: PropTypes.array,
};

export default NoblesList;


