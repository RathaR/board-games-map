import { createSelector } from 'reselect';
import {noblesSelector } from './commmon';

export const nobleSelector = (nobleId) => createSelector(
    noblesSelector,
    nobles => nobles.find(nobleId)
  );

export const noblePrestigeSelector = noble => noble.prestige;
