import {COLORS} from "./constants/common";

const GAME_STATE = {
  game: {
    turn: 'Player1',
    target: 15,
  },
  players: [{
    id: 'Player1',
    nobles: [],
    reserve: [{
      level: 1,
      prestige: 2,
      bonus: COLORS.BLACK,
      cost: {
        white: 2,
        black: 3,
      }
    }, {
      level: 1,
      prestige: 1,
      bonus: COLORS.RED,
      cost: {
        white: 2,
        black: 3,
      }
    }],
    tokens: {
      blue: 2,
      black: 0,
      green: 3,
      red: 0,
      white: 2,
      gold: 1,
    },
    cards: [{
      level: 1,
      prestige: 1,
      bonus: COLORS.GREEN,
      cost: {
        red: 1,
        blue: 2,
        black: 3,
      }
    }],
  }, {
    id: 'Player2',
    nobles: [{
      bonuses: {
        [COLORS.BLACK]: 2,
        [COLORS.GREEN]: 2
      },
      prestige: 2
    }],
    reserve: [],
    tokens: {
      blue: 2,
      black: 0,
      green: 3,
      red: 0,
      white: 2,
      gold: 1,
    },
    cards: [],
  }, {
    id: 'Player3',
    nobles: [],
    reserve: [],
    tokens: {
      blue: 2,
      black: 0,
      green: 3,
      red: 0,
      white: 2,
      gold: 1,
    },
    cards: [],
  }, {
    id: 'Player4',
    nobles: [{
      bonuses: {
        [COLORS.BLACK]: 2,
        [COLORS.GREEN]: 2
      },
      prestige: 2
    }],
    reserve: [],
    tokens: {
      blue: 2,
      black: 0,
      green: 3,
      red: 0,
      white: 2,
      gold: 1,
    },
    cards: [],
  }],
  board: {
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
    tokens: {
      blue: 4,
      black: 4,
      green: 4,
      red: 4,
      white: 4,
      gold: 5,
    },
    decks: [{level: 1, count: 14}, {level: 2, count: 15}, {level: 3, count: 18}],
    cards: [{
      level: 1,
      prestige: 1,
      bonus: COLORS.GREEN,
      cost: {
        red: 1,
        blue: 2,
        black: 3,
      }
    }, {
      level: 1,
      prestige: 0,
      bonus: COLORS.RED,
      cost: {
        blue: 2,
        black: 3,
      }
    }, {
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
      level: 1,
      prestige: 0,
      bonus: COLORS.BLACK,
      cost: {
        white: 2,
        black: 3,
      }
    },{
      level: 2,
      prestige: 1,
      bonus: COLORS.GREEN,
      cost: {
        red: 1,
        blue: 2,
        black: 3,
      }
    }, {
      level: 2,
      prestige: 0,
      bonus: COLORS.RED,
      cost: {
        blue: 2,
        black: 3,
      }
    }, {
      level: 2,
      prestige: 2,
      bonus: COLORS.BLACK,
      cost: {
        white: 2,
        black: 3,
      }
    }, {
      level: 2,
      prestige: 0,
      bonus: COLORS.BLACK,
      cost: {
        white: 2,
        black: 3,
      }
    }, {
      level: 3,
      prestige: 1,
      bonus: COLORS.GREEN,
      cost: {
        red: 1,
        blue: 2,
        black: 3,
      }
    }, {
      level: 3,
      prestige: 0,
      bonus: COLORS.RED,
      cost: {
        blue: 2,
        black: 3,
      }
    }, {
      level: 3,
      prestige: 2,
      bonus: COLORS.BLACK,
      cost: {
        white: 2,
        black: 3,
      }
    }, {
      level: 3,
      prestige: 0,
      bonus: COLORS.BLACK,
      cost: {
        white: 2,
        black: 3,
      }
    }]
  }
};

export default GAME_STATE;
