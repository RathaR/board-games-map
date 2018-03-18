import { createSelector } from 'reselect';
import {noblesSelector } from './common';
import {boardSelector} from "./common";

export const nobleSelector = (nobleId) => createSelector(
    noblesSelector,
    nobles => nobles.find(noble => noble.id === nobleId)
  );

export const playingNoblesSelector = createSelector(
  boardSelector,
  board => board.nobles
);

export const noblePrestigeSelector = noble => noble.prestige;
