import {COLORS} from "./constants/common";

const GAME_STATE = {
  activePlayer: 'Player1',
  turn: {
    selectedTokens: [],
  },
  players: [{
    id: 'Player1',
    order: 1,
    nobles: [],
    reserve: [],
    tokens: [
      {colour: COLORS.BLUE, amount: 5},
      {colour: COLORS.GREEN, amount: 5},
      {colour: COLORS.RED, amount: 5},
      {colour: COLORS.WHITE, amount: 5},
      {colour: COLORS.BLACK, amount: 5},
      {colour: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }, {
    id: 'Player2',
    order: 2,
    nobles: [],
    reserve: [],
    tokens: [
      {colour: COLORS.BLUE, amount: 0},
      {colour: COLORS.GREEN, amount: 0},
      {colour: COLORS.RED, amount: 0},
      {colour: COLORS.WHITE, amount: 0},
      {colour: COLORS.BLACK, amount: 0},
      {colour: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }, {
    id: 'Player3',
    order: 3,
    nobles: [],
    reserve: [],
    tokens: [
      {colour: COLORS.BLUE, amount: 0},
      {colour: COLORS.GREEN, amount: 0},
      {colour: COLORS.RED, amount: 0},
      {colour: COLORS.WHITE, amount: 0},
      {colour: COLORS.BLACK, amount: 0},
      {colour: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }, {
    id: 'Player4',
    order: 4,
    nobles: [],
    reserve: [],
    tokens: [
      {colour: COLORS.BLUE, amount: 0},
      {colour: COLORS.GREEN, amount: 0},
      {colour: COLORS.RED, amount: 0},
      {colour: COLORS.WHITE, amount: 0},
      {colour: COLORS.BLACK, amount: 0},
      {colour: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }],
  cards: [{
    id: '1',
    level: 1,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: [{colour: COLORS.RED, amount: 1}, {colour: COLORS.BLUE, amount: 2}],
  }, {
    id: '2',
    level: 1,
    prestige: 0,
    bonus: COLORS.RED,
    cost: [{colour: COLORS.GREEN, amount: 1}, {colour: COLORS.BLACK, amount: 1}],
  }, {
    id: '3',
    level: 1,
    prestige: 2,
    bonus: COLORS.BLACK,
    cost: [{colour: COLORS.RED, amount: 1}, {colour: COLORS.WHITE, amount: 2}],
  }, {
    id: '4',
    level: 1,
    prestige: 0,
    bonus: COLORS.BLUE,
    cost: [{colour: COLORS.BLACK, amount: 1}, {colour: COLORS.WHITE, amount: 1}, {colour: COLORS.BLUE, amount: 1}],
  },{
    id: '5',
    level: 2,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: [{colour: COLORS.GREEN, amount: 2}],
  }, {
    id: '6',
    level: 2,
    prestige: 0,
    bonus: COLORS.RED,
    cost: [{colour: COLORS.GREEN, amount: 1}, {colour: COLORS.WHITE, amount: 1}, {colour: COLORS.BLUE, amount: 1}],
  }, {
    id: '7',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLACK,
    cost: [{colour: COLORS.GREEN, amount: 2}],
  }, {
    id: '8',
    level: 2,
    prestige: 0,
    bonus: COLORS.WHITE,
    cost: [{colour: COLORS.RED, amount: 1}],
  }, {
    id: '9',
    level: 3,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: [{colour: COLORS.BLUE, amount: 1}],
  }, {
    id: '10',
    level: 3,
    prestige: 0,
    bonus: COLORS.BLUE,
    cost: [{colour: COLORS.BLACK, amount: 1}],
  }, {
    id: '11',
    level: 3,
    prestige: 2,
    bonus: COLORS.BLACK,
    cost: [],
  }, {
    id: '12',
    level: 3,
    prestige: 0,
    bonus: COLORS.BLACK,
    cost: [],
  }, {
    id: '13',
    level: 1,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: [],
  }, {
    id: '14',
    level: 1,
    prestige: 0,
    bonus: COLORS.WHITE,
    cost: [],
  },  {
    id: '15',
    level: 1,
    prestige: 0,
    bonus: COLORS.RED,
    cost: [],
  }, {
    id: '16',
    level: 2,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: [],
  }, {
    id: '17',
    level: 2,
    prestige: 1,
    bonus: COLORS.WHITE,
    cost: [],
  },  {
    id: '18',
    level: 2,
    prestige: 1,
    bonus: COLORS.BLUE,
    cost: [],
  },  {
    id: '19',
    level: 3,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: [],
  }, {
    id: '20',
    level: 3,
    prestige: 1,
    bonus: COLORS.WHITE,
    cost: [],
  },  {
    id: '21',
    level: 3,
    prestige: 1,
    bonus: COLORS.BLUE,
    cost: [],
  }],
  board: {
    cards: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    decks: [{
      level: 1,
      cards : ['13', '14', '15']
    }, {
      level: 2,
      cards: ['16', '17', '18']
    }, {
      level: 3,
      cards: ['19', '20', '21']
    }],
  },
  tokens: [
    {colour: COLORS.BLUE, amount: 8},
    {colour: COLORS.GREEN, amount: 8},
    {colour: COLORS.RED, amount: 8},
    {colour: COLORS.WHITE, amount: 8},
    {colour: COLORS.BLACK, amount: 8},
    {colour: COLORS.GOLD, amount: 7},
  ],
  nobles: [{
    bonuses: {
      [COLORS.RED]: 1,
      [COLORS.GREEN]: 3,
    },
    prestige: 0
  }, {
    bonuses: {
      [COLORS.BLUE]: 1,
      [COLORS.WHITE]: 3,
      [COLORS.BLACK]: 3,
    },
    prestige: 0
  }, {
    bonuses: {
      [COLORS.BLACK]: 2,
      [COLORS.GREEN]: 2,
      [COLORS.WHITE]: 2
    },
    prestige: 0
  },{
    bonuses: {
      [COLORS.RED]: 1,
      [COLORS.GREEN]: 3
    },
    prestige: 0
  }, {
    bonuses: {
      [COLORS.BLACK]: 2,
      [COLORS.GREEN]: 2
    },
    prestige: 0
  }],
};

export default GAME_STATE;
