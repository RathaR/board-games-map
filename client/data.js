import {COLORS} from "./constants/common";

const GAME_STATE = {
  activePlayer: 'Player1',
  turn: {
    selectedTokens: [],
  },
  players: [{
    id: 'Player1',
    prestige: 4,
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
    id: 'Player2',
    prestige: 5,
    nobles: [{
      bonuses: {
        [COLORS.BLACK]: 2,
        [COLORS.GREEN]: 2
      },
      prestige: 2
    }],
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
    prestige: 0,
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
    prestige: 1,
    nobles: [{
      bonuses: {
        [COLORS.BLACK]: 2,
        [COLORS.GREEN]: 2
      },
      prestige: 2
    }],
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
    cost: {
      red: 1,
      blue: 2,
      black: 3,
    }
  }, {
    id: '2',
    level: 1,
    prestige: 0,
    bonus: COLORS.RED,
    cost: {
      blue: 2,
      black: 3,
    }
  }, {
    id: '3',
    level: 1,
    prestige: 2,
    bonus: COLORS.BLACK,
    cost: {
      white: 2,
      red: 2,
      green: 2,
      blue: 3,
    }
  }, {
    id: '4',
    level: 1,
    prestige: 0,
    bonus: COLORS.BLUE,
    cost: {
      white: 2,
      black: 3,
    }
  },{
    id: '5',
    level: 2,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: {
      red: 1,
      blue: 2,
      black: 3,
    }
  }, {
    id: '6',
    level: 2,
    prestige: 0,
    bonus: COLORS.RED,
    cost: {
      blue: 2,
      black: 3,
    }
  }, {
    id: '7',
    level: 2,
    prestige: 2,
    bonus: COLORS.BLACK,
    cost: {
      white: 2,
      black: 3,
    }
  }, {
    id: '8',
    level: 2,
    prestige: 0,
    bonus: COLORS.WHITE,
    cost: {
      white: 2,
      black: 3,
    }
  }, {
    id: '9',
    level: 3,
    prestige: 1,
    bonus: COLORS.GREEN,
    cost: {
      red: 1,
      blue: 2,
      black: 3,
    }
  }, {
    id: '10',
    level: 3,
    prestige: 0,
    bonus: COLORS.BLUE,
    cost: {
      blue: 2,
      black: 3,
    }
  }, {
    id: '11',
    level: 3,
    prestige: 2,
    bonus: COLORS.BLACK,
    cost: {
      white: 2,
      black: 3,
    }
  }, {
    id: '12',
    level: 3,
    prestige: 0,
    bonus: COLORS.BLACK,
    cost: {
      white: 2,
      black: 3,
    }
  }, {
    id: '13',
    level: 1,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: {
      white: 6,
      black: 3,
      green: 4,
    }
  }, {
    id: '14',
    level: 1,
    prestige: 0,
    bonus: COLORS.WHITE,
    cost: {
      black: 3,
      red: 1,
    }
  },  {
    id: '15',
    level: 1,
    prestige: 0,
    bonus: COLORS.RED,
    cost: {
      blue: 1,
      red: 1,
    }
  }, {
    id: '16',
    level: 2,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: {
      white: 6,
      black: 3,
      green: 4,
    }
  }, {
    id: '17',
    level: 2,
    prestige: 1,
    bonus: COLORS.WHITE,
    cost: {
      blue: 3,
      white: 3,
      red: 1,
    }
  },  {
    id: '18',
    level: 2,
    prestige: 1,
    bonus: COLORS.BLUE,
    cost: {
      blue: 1,
      red: 1,
    }
  },  {
    id: '19',
    level: 3,
    prestige: 3,
    bonus: COLORS.WHITE,
    cost: {
      white: 6,
      black: 3,
      green: 4,
    }
  }, {
    id: '20',
    level: 3,
    prestige: 1,
    bonus: COLORS.WHITE,
    cost: {
      blue: 3,
      white: 3,
      red: 1,
    }
  },  {
    id: '21',
    level: 3,
    prestige: 1,
    bonus: COLORS.BLUE,
    cost: {
      blue: 1,
      red: 1,
    }
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
    {colour: COLORS.BLUE, amount: 4},
    {colour: COLORS.GREEN, amount: 4},
    {colour: COLORS.RED, amount: 4},
    {colour: COLORS.WHITE, amount: 4},
    {colour: COLORS.BLACK, amount: 4},
    {colour: COLORS.GOLD, amount: 5},
  ],
  nobles: [{
    bonuses: {
      [COLORS.RED]: 1,
      [COLORS.GREEN]: 3
    },
    prestige: 1
  }, {
    bonuses: {
      [COLORS.BLACK]: 2,
      [COLORS.GREEN]: 2
    },
    prestige: 2
  }],
};

export default GAME_STATE;
