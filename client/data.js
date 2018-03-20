import {COLORS} from "./constants/common";

const GAME_STATE = {
  rooms:[{
    id: '1',
    players: ''
  }, {
    id: '2'
  }, {
    id: '3'
  }],
  activePlayer: 'Player1',
  turn: {
    selectedTokens: [],
  },
  players: [{
    id: 'Player1',
    order: 1,
    nobles: ['6'],
    reserve: [],
    tokens: [
      {color: COLORS.BLUE, amount: 4},
      {color: COLORS.GREEN, amount: 4},
      {color: COLORS.RED, amount: 4},
      {color: COLORS.WHITE, amount: 4},
      {color: COLORS.BLACK, amount: 4},
      {color: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }, {
    id: 'Player2',
    order: 2,
    nobles: [],
    reserve: [],
    tokens: [
      {color: COLORS.BLUE, amount: 0},
      {color: COLORS.GREEN, amount: 0},
      {color: COLORS.RED, amount: 0},
      {color: COLORS.WHITE, amount: 0},
      {color: COLORS.BLACK, amount: 0},
      {color: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }, {
    id: 'Player3',
    order: 3,
    nobles: [],
    reserve: [],
    tokens: [
      {color: COLORS.BLUE, amount: 0},
      {color: COLORS.GREEN, amount: 0},
      {color: COLORS.RED, amount: 0},
      {color: COLORS.WHITE, amount: 0},
      {color: COLORS.BLACK, amount: 0},
      {color: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }, {
    id: 'Player4',
    order: 4,
    nobles: [],
    reserve: [],
    tokens: [
      {color: COLORS.BLUE, amount: 0},
      {color: COLORS.GREEN, amount: 0},
      {color: COLORS.RED, amount: 0},
      {color: COLORS.WHITE, amount: 0},
      {color: COLORS.BLACK, amount: 0},
      {color: COLORS.GOLD, amount: 0},
    ],
    cards: [],
  }],
  cards: [{
    id: '1',
    level: 1,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 1}, {color: COLORS.BLUE, amount: 1}],
  }, {
    id: '2',
    level: 1,
    prestige: 0,
    bonus: COLORS.RED,
    cost: [{color: COLORS.GREEN, amount: 1}, {color: COLORS.BLACK, amount: 1}],
  }, {
    id: '3',
    level: 1,
    prestige: 1,
    bonus: COLORS.BLACK,
    cost: [{color: COLORS.RED, amount: 1}, {color: COLORS.WHITE, amount: 2}],
  }, {
    id: '4',
    level: 1,
    prestige: 0,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.BLACK, amount: 1}, {color: COLORS.WHITE, amount: 1}, {color: COLORS.BLUE, amount: 1}],
  }, {
    id: '5',
    level: 1,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.GREEN, amount: 2}],
  }, {
    id: '6',
    level: 1,
    prestige: 0,
    bonus: COLORS.RED,
    cost: [{color: COLORS.GREEN, amount: 1}, {color: COLORS.WHITE, amount: 1}, {color: COLORS.BLUE, amount: 1}],
  }, {
    id: '7',
    level: 1,
    prestige: 1,
    bonus: COLORS.BLACK,
    cost: [{color: COLORS.GREEN, amount: 2}],
  }, {
    id: '8',
    level: 1,
    prestige: 2,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.RED, amount: 1}],
  }, {
    id: '9',
    level: 1,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.BLUE, amount: 1}],
  }, {
    id: '10',
    level: 1,
    prestige: 0,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.BLACK, amount: 1}],
  }, {
    id: '11',
    level: 1,
    prestige: 1,
    bonus: COLORS.BLACK,
    cost: [{color: COLORS.BLACK, amount: 3}],
  }, {
    id: '12',
    level: 1,
    prestige: 2,
    bonus: COLORS.BLACK,
    cost: [{color: COLORS.WHITE, amount: 1}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '13',
    level: 1,
    prestige: 2,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.BLUE, amount: 3}],
  }, {
    id: '14',
    level: 1,
    prestige: 1,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.RED, amount: 3}],
  }, {
    id: '15',
    level: 1,
    prestige: 0,
    bonus: COLORS.RED,
    cost: [{color: COLORS.GREEN, amount: 2}],
  }, {
    id: '16',
    level: 1,
    prestige: 0,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.GREEN, amount: 1}, {color: COLORS.RED, amount: 2}, {color: COLORS.BLUE, amount: 1}],
  }, {
    id: '17',
    level: 1,
    prestige: 1,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.WHITE, amount: 1}, {color: COLORS.BLACK, amount: 1}, {color: COLORS.BLUE, amount: 1}],
  }, {
    id: '18',
    level: 1,
    prestige: 1,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.WHITE, amount: 1}],
  }, {
    id: '19',
    level: 1,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.RED, amount: 1}],
  }, {
    id: '20',
    level: 2,
    prestige: 2,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.RED, amount: 4}],
  }, {
    id: '21',
    level: 2,
    prestige: 2,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '22',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.GREEN, amount: 2}, {color: COLORS.WHITE, amount: 2}],
  }, {
    id: '23',
    level: 2,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.BLACK, amount: 4}],
  }, {
    id: '24',
    level: 2,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}, {color: COLORS.WHITE, amount: 2}],
  }, {
    id: '25',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '26',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '27',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '28',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '29',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '23',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '31',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '32',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '33',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '34',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '35',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '36',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '37',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '38',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '39',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLUE,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '40',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '41',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '42',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '43',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '44',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '45',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '46',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '47',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '48',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '49',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '50',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '51',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '52',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '53',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '54',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '55',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '56',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '57',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '58',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '59',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }, {
    id: '60',
    level: 3,
    prestige: 4,
    bonus: COLORS.GREEN,
    cost: [{color: COLORS.RED, amount: 2}, {color: COLORS.GREEN, amount: 2}],
  }],
  board: {
    cards: ['1', '2', '3', '4', '20', '21', '22', '23', '40', '41', '42', '43'],
    decks: [{
      level: 3,
      cards: ['44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    }, {
      level: 2,
      cards: ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39']
    }, {
      level: 1,
      cards: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
    }],
    nobles:['1', '2', '3', '4', '5']
  },
  tokens: [
    {color: COLORS.BLUE, amount: 8},
    {color: COLORS.GREEN, amount: 8},
    {color: COLORS.RED, amount: 8},
    {color: COLORS.WHITE, amount: 8},
    {color: COLORS.BLACK, amount: 8},
    {color: COLORS.GOLD, amount: 7},
  ],
  nobles: [{
    id: '1',
    bonuses: [{color: COLORS.RED, amount: 1},{color: COLORS.GREEN, amount: 1}],
    prestige: 3
  }, {
    id: '2',
    bonuses: [{color: COLORS.BLUE, amount: 1}, {color: COLORS.WHITE, amount: 3}],
    prestige: 4
  }, {
    id: '3',
    bonuses: [{color: COLORS.BLUE, amount: 1}, {color: COLORS.WHITE, amount: 3}],
    prestige: 3
  }, {
    id: '4',
    bonuses: [{color: COLORS.BLACK, amount: 3}, {color: COLORS.WHITE, amount: 3}, {color: COLORS.RED, amount: 3}],
    prestige: 4
  }, {
    id: '5',
    bonuses: [{color: COLORS.BLUE, amount: 3}, {color: COLORS.WHITE, amount: 3}],
    prestige: 5
  },  {
    id: '6',
    bonuses: [{color: COLORS.GREEN, amount: 3}, {color: COLORS.RED, amount: 3}],
    prestige: 3
  }],
};

export default GAME_STATE;
