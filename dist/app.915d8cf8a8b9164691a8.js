webpackJsonp([0],{

/***/ "./client/App.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("./node_modules/react-redux/es/index.js");

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/styles.scss");

var _Game = __webpack_require__("./client/scense/Game/index.jsx");

var _Game2 = _interopRequireDefault(_Game);

var _commmon = __webpack_require__("./client/selectors/commmon.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapStateToProps = state => {
  return {
    players: (0, _commmon.playersSelector)(state)
  };
};

const mapDispatchToProps = dispatch => ({});

const ConnectedGame = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Game2.default);

const App = ({ store }) => _react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    'div',
    { className: 'app' },
    _react2.default.createElement(ConnectedGame, null)
  )
);

App.propTypes = {
  store: _propTypes2.default.object.isRequired
};

exports.default = App;

/***/ }),

/***/ "./client/actions/actionTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const HOLD_CARD = exports.HOLD_CARD = 'HOLD_CARD';
const BUY_CARD = exports.BUY_CARD = 'BUY_CARD';
const TOGGLE_TOKEN_SELECTION = exports.TOGGLE_TOKEN_SELECTION = 'TOGGLE_TOKEN_SELECTION';
const PICK_SELECTED = exports.PICK_SELECTED = 'PICK_SELECTED';
const PICK_DOUBLE = exports.PICK_DOUBLE = 'PICK_DOUBLE';
const SWITCH_PLAYER = exports.SWITCH_PLAYER = 'SWITCH_PLAYER';

/***/ }),

/***/ "./client/actions/activePlayer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchPlayer = switchPlayer;

var _player = __webpack_require__("./client/selectors/player.js");

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

function switchPlayer() {
  return (dispatch, getState) => {
    const activePlayerId = (0, _commmon.activePlayerIdSelector)(getState());
    const activePlayer = (0, _player.playerSelector)(activePlayerId)(getState());
    const playersCount = (0, _player.playersCountSelector)(getState());

    const nextPlayerOrder = activePlayer.order >= playersCount ? 1 : activePlayer.order + 1;
    const nextPlayer = (0, _player.playerByOrderSelector)(nextPlayerOrder)(getState());
    dispatch({ type: _actionTypes.SWITCH_PLAYER, nextPlayerId: nextPlayer.id });
  };
}

/***/ }),

/***/ "./client/actions/helpers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMissingTokens = undefined;

var _commmon = __webpack_require__("./client/selectors/commmon.js");

var _player = __webpack_require__("./client/selectors/player.js");

var _cards = __webpack_require__("./client/selectors/cards.js");

const getMissingTokens = exports.getMissingTokens = function (state, playerId, cardId) {
  const player = (0, _player.playerSelector)(playerId)(state);
  const playerTokens = (0, _player.playerTokensSelector)(player);
  const playerBonuses = (0, _player.playerBonusesSelector)(playerId)(state);
  const card = (0, _cards.cardSelector)(cardId)(state);
  const cardCost = (0, _cards.cardCostSelector)(card);

  const missingTokens = cardCost.reduce((acc, curr) => {
    const availableTokens = playerTokens.find(token => token.color === curr.color).amount;
    const availableBonus = playerBonuses.find(bonus => bonus.bonus === curr.color);
    const bonusAmount = availableBonus ? availableBonus.amount : 0;
    if (curr.amount > availableTokens + bonusAmount) {
      acc.push({ color: curr.color, amount: curr.amount - availableTokens + bonusAmount });
    }
    return acc;
  }, []);

  return missingTokens;
};

/***/ }),

/***/ "./client/actions/player.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buyCard = buyCard;
exports.holdCard = holdCard;
exports.pickSelected = pickSelected;
exports.pickDouble = pickDouble;

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

var _player = __webpack_require__("./client/selectors/player.js");

var _cards = __webpack_require__("./client/selectors/cards.js");

var _activePlayer = __webpack_require__("./client/actions/activePlayer.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

var _helpers = __webpack_require__("./client/actions/helpers.js");

var _tokens = __webpack_require__("./client/selectors/tokens.js");

function buyCard(cardId) {
  return (dispatch, getState) => {
    const state = getState();
    const playerId = (0, _commmon.activePlayerIdSelector)(state);

    const cardOwner = (0, _cards.cardOwnerSelector)(cardId)(state);
    if (cardOwner && cardOwner.id !== playerId) {
      return;
    }

    if ((0, _helpers.getMissingTokens)(state, playerId, cardId).length) {
      return;
    }

    dispatch({
      type: _actionTypes.BUY_CARD,
      card: (0, _cards.cardSelector)(cardId)(state),
      reserved: cardOwner && cardOwner.id === playerId,
      bonuses: (0, _player.playerBonusesSelector)(playerId)(state),
      playerId
    });
    dispatch((0, _activePlayer.switchPlayer)());
  };
}

function holdCard(cardId) {
  return (dispatch, getState) => {
    const state = getState();
    const playerId = (0, _commmon.activePlayerIdSelector)(state);
    const player = (0, _player.playerSelector)(playerId)(state);
    const reservedCards = (0, _player.playerReservedCardsSelector)(player);

    if (reservedCards.length >= 3) {
      return;
    }

    dispatch({
      type: _actionTypes.HOLD_CARD,
      card: (0, _cards.cardSelector)(cardId)(getState()),
      playerId
    });
    dispatch((0, _activePlayer.switchPlayer)());
  };
}

function pickSelected() {

  return (dispatch, getState) => {
    const state = getState();
    const { selectedTokens } = (0, _commmon.turn)(state);
    const activePlayerId = (0, _commmon.activePlayerIdSelector)(state);

    dispatch({ type: _actionTypes.PICK_SELECTED, selectedTokens: selectedTokens, playerId: activePlayerId });
    dispatch((0, _activePlayer.switchPlayer)());
  };
}

function pickDouble() {

  return (dispatch, getState) => {
    const state = getState();
    const { selectedTokens } = (0, _commmon.turn)(state);
    const selectedColor = selectedTokens[0];
    const activePlayerId = (0, _commmon.activePlayerIdSelector)(state);

    const tokens = (0, _tokens.tokensSelector)(state);
    const selectedToken = (0, _tokens.tokenByColorSelector)(selectedColor)(state);
    if (selectedToken.amount < 4) {
      return;
    }
    dispatch({ type: _actionTypes.PICK_DOUBLE, selectedToken: selectedToken.color, playerId: activePlayerId });
    dispatch((0, _activePlayer.switchPlayer)());
  };
}

/***/ }),

/***/ "./client/actions/tokens.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleTokenSelection = toggleTokenSelection;

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

function toggleTokenSelection(color) {
  return { type: _actionTypes.TOGGLE_TOKEN_SELECTION, color };
}

/***/ }),

/***/ "./client/constants/common.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const COLORS = exports.COLORS = {
  RED: 'red',
  GREEN: 'green',
  GOLD: 'gold',
  BLACK: 'black',
  WHITE: 'white',
  BLUE: 'blue'
};

const BONUS_COLORS = exports.BONUS_COLORS = [COLORS.BLUE, COLORS.BLACK, COLORS.GREEN, COLORS.RED, COLORS.WHITE];

const CARD_VIEW_TYPE = exports.CARD_VIEW_TYPE = {
  RESERVED: 'reserved',
  BOARD: 'board'
};

/***/ }),

/***/ "./client/data.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__("./client/constants/common.js");

const GAME_STATE = {
  activePlayer: 'Player1',
  turn: {
    selectedTokens: []
  },
  players: [{
    id: 'Player1',
    order: 1,
    nobles: [],
    reserve: [],
    tokens: [{ color: _common.COLORS.BLUE, amount: 4 }, { color: _common.COLORS.GREEN, amount: 4 }, { color: _common.COLORS.RED, amount: 4 }, { color: _common.COLORS.WHITE, amount: 4 }, { color: _common.COLORS.BLACK, amount: 4 }, { color: _common.COLORS.GOLD, amount: 0 }],
    cards: []
  }, {
    id: 'Player2',
    order: 2,
    nobles: [],
    reserve: [],
    tokens: [{ color: _common.COLORS.BLUE, amount: 0 }, { color: _common.COLORS.GREEN, amount: 0 }, { color: _common.COLORS.RED, amount: 0 }, { color: _common.COLORS.WHITE, amount: 0 }, { color: _common.COLORS.BLACK, amount: 0 }, { color: _common.COLORS.GOLD, amount: 0 }],
    cards: []
  }, {
    id: 'Player3',
    order: 3,
    nobles: [],
    reserve: [],
    tokens: [{ color: _common.COLORS.BLUE, amount: 0 }, { color: _common.COLORS.GREEN, amount: 0 }, { color: _common.COLORS.RED, amount: 0 }, { color: _common.COLORS.WHITE, amount: 0 }, { color: _common.COLORS.BLACK, amount: 0 }, { color: _common.COLORS.GOLD, amount: 0 }],
    cards: []
  }, {
    id: 'Player4',
    order: 4,
    nobles: [],
    reserve: [],
    tokens: [{ color: _common.COLORS.BLUE, amount: 0 }, { color: _common.COLORS.GREEN, amount: 0 }, { color: _common.COLORS.RED, amount: 0 }, { color: _common.COLORS.WHITE, amount: 0 }, { color: _common.COLORS.BLACK, amount: 0 }, { color: _common.COLORS.GOLD, amount: 0 }],
    cards: []
  }],
  cards: [{
    id: '1',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 1 }, { color: _common.COLORS.BLUE, amount: 1 }]
  }, {
    id: '2',
    level: 1,
    prestige: 0,
    bonus: _common.COLORS.RED,
    cost: [{ color: _common.COLORS.GREEN, amount: 1 }, { color: _common.COLORS.BLACK, amount: 1 }]
  }, {
    id: '3',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.BLACK,
    cost: [{ color: _common.COLORS.RED, amount: 1 }, { color: _common.COLORS.WHITE, amount: 2 }]
  }, {
    id: '4',
    level: 1,
    prestige: 0,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.BLACK, amount: 1 }, { color: _common.COLORS.WHITE, amount: 1 }, { color: _common.COLORS.BLUE, amount: 1 }]
  }, {
    id: '5',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '6',
    level: 1,
    prestige: 0,
    bonus: _common.COLORS.RED,
    cost: [{ color: _common.COLORS.GREEN, amount: 1 }, { color: _common.COLORS.WHITE, amount: 1 }, { color: _common.COLORS.BLUE, amount: 1 }]
  }, {
    id: '7',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.BLACK,
    cost: [{ color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '8',
    level: 1,
    prestige: 2,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.RED, amount: 1 }]
  }, {
    id: '9',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.BLUE, amount: 1 }]
  }, {
    id: '10',
    level: 1,
    prestige: 0,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.BLACK, amount: 1 }]
  }, {
    id: '11',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.BLACK,
    cost: [{ color: _common.COLORS.BLACK, amount: 3 }]
  }, {
    id: '12',
    level: 1,
    prestige: 2,
    bonus: _common.COLORS.BLACK,
    cost: [{ color: _common.COLORS.WHITE, amount: 1 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '13',
    level: 1,
    prestige: 2,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.BLUE, amount: 3 }]
  }, {
    id: '14',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.RED, amount: 3 }]
  }, {
    id: '15',
    level: 1,
    prestige: 0,
    bonus: _common.COLORS.RED,
    cost: [{ color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '16',
    level: 1,
    prestige: 0,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.GREEN, amount: 1 }, { color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.BLUE, amount: 1 }]
  }, {
    id: '17',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.WHITE, amount: 1 }, { color: _common.COLORS.BLACK, amount: 1 }, { color: _common.COLORS.BLUE, amount: 1 }]
  }, {
    id: '18',
    level: 1,
    prestige: 1,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.WHITE, amount: 1 }]
  }, {
    id: '19',
    level: 1,
    prestige: 3,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.RED, amount: 1 }]
  }, {
    id: '20',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.RED, amount: 4 }]
  }, {
    id: '21',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '22',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.GREEN, amount: 2 }, { color: _common.COLORS.WHITE, amount: 2 }]
  }, {
    id: '23',
    level: 2,
    prestige: 3,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.BLACK, amount: 4 }]
  }, {
    id: '24',
    level: 2,
    prestige: 3,
    bonus: _common.COLORS.WHITE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.WHITE, amount: 2 }]
  }, {
    id: '25',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '26',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '27',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '28',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '29',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '23',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '31',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '32',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '33',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '34',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '35',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '36',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '37',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '38',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '39',
    level: 2,
    prestige: 2,
    bonus: _common.COLORS.BLUE,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '40',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '41',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '42',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '43',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '44',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '45',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '46',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '47',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '48',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '49',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '50',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '51',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '52',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '53',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '54',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '55',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '56',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '57',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '58',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '59',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
  }, {
    id: '60',
    level: 3,
    prestige: 4,
    bonus: _common.COLORS.GREEN,
    cost: [{ color: _common.COLORS.RED, amount: 2 }, { color: _common.COLORS.GREEN, amount: 2 }]
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
    }]
  },
  tokens: [{ color: _common.COLORS.BLUE, amount: 8 }, { color: _common.COLORS.GREEN, amount: 8 }, { color: _common.COLORS.RED, amount: 8 }, { color: _common.COLORS.WHITE, amount: 8 }, { color: _common.COLORS.BLACK, amount: 8 }, { color: _common.COLORS.GOLD, amount: 7 }],
  nobles: [{
    id: '1',
    bonuses: {
      [_common.COLORS.RED]: 1,
      [_common.COLORS.GREEN]: 3
    },
    prestige: 3
  }, {
    id: '2',
    bonuses: {
      [_common.COLORS.BLUE]: 1,
      [_common.COLORS.WHITE]: 3,
      [_common.COLORS.BLACK]: 3
    },
    prestige: 4
  }, {
    id: '3',
    bonuses: {
      [_common.COLORS.BLACK]: 2,
      [_common.COLORS.GREEN]: 2,
      [_common.COLORS.WHITE]: 2
    },
    prestige: 3
  }, {
    id: '4',
    bonuses: {
      [_common.COLORS.RED]: 1,
      [_common.COLORS.GREEN]: 3
    },
    prestige: 4
  }, {
    id: '5',
    bonuses: {
      [_common.COLORS.BLACK]: 2,
      [_common.COLORS.GREEN]: 2
    },
    prestige: 5
  }]
};

exports.default = GAME_STATE;

/***/ }),

/***/ "./client/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/index.js");

var _App = __webpack_require__("./client/App.jsx");

var _App2 = _interopRequireDefault(_App);

var _configureStore = __webpack_require__("./client/store/configureStore.js");

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = (0, _configureStore2.default)();
const render = Component => {
  _reactDom2.default.render(_react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(Component, { store: store })
  ), document.getElementById('root'));
  if ("production" === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch(() => {});
    });
  }
};

render(_App2.default);
if (false) {
  module.hot.accept();
}

/***/ }),

/***/ "./client/reducers/activePlayer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

var _data = __webpack_require__("./client/data.js");

var _data2 = _interopRequireDefault(_data);

var _commmon = __webpack_require__("./client/selectors/commmon.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activePlayer = function (state = (0, _commmon.activePlayerIdSelector)(_data2.default), action) {
  switch (action.type) {
    case _actionTypes.SWITCH_PLAYER:
      {
        return action.nextPlayerId;
      }
    default:
      return state;
  }
};

exports.default = activePlayer;

/***/ }),

/***/ "./client/reducers/board.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _data = __webpack_require__("./client/data.js");

var _data2 = _interopRequireDefault(_data);

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const drawCard = function (board, card) {
  const deck = board.decks.find(deck => deck.level === card.level);
  const rowIndex = board.cards.indexOf(card.id);

  const newCards = [...board.cards];
  const nextCard = deck.cards[0];
  if (nextCard) {
    newCards.splice(rowIndex, 1, nextCard);
  } else {
    newCards.splice(rowIndex, 1);
  }

  return _extends({}, board, {
    cards: newCards,
    decks: board.decks.map(item => {
      if (item === deck) {
        return _extends({}, deck, {
          cards: deck.cards.filter(card => card !== nextCard)
        });
      }
      return item;
    })
  });
};

const board = function (state = _data2.default.board, action) {
  switch (action.type) {

    case _actionTypes.HOLD_CARD:
      {
        return drawCard(state, action.card);
      }

    case _actionTypes.BUY_CARD:
      {
        if (action.reserved) {
          return state;
        }

        return drawCard(state, action.card);
      }
    default:
      {
        return state;
      }
  }
};

exports.default = board;

/***/ }),

/***/ "./client/reducers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__("./node_modules/redux/es/index.js");

var _data = __webpack_require__("./client/data.js");

var _data2 = _interopRequireDefault(_data);

var _activePlayer = __webpack_require__("./client/reducers/activePlayer.js");

var _activePlayer2 = _interopRequireDefault(_activePlayer);

var _turn = __webpack_require__("./client/reducers/turn.js");

var _turn2 = _interopRequireDefault(_turn);

var _tokens = __webpack_require__("./client/reducers/tokens.js");

var _tokens2 = _interopRequireDefault(_tokens);

var _board = __webpack_require__("./client/reducers/board.js");

var _board2 = _interopRequireDefault(_board);

var _players = __webpack_require__("./client/reducers/players.js");

var _players2 = _interopRequireDefault(_players);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cards = function (state = _data2.default.cards, action) {
  return state;
};

const nobles = function (state = _data2.default.nobles) {
  return state;
};

const rootReducer = (0, _redux.combineReducers)({ cards, activePlayer: _activePlayer2.default, turn: _turn2.default, players: _players2.default, board: _board2.default, nobles, tokens: _tokens2.default });

exports.default = rootReducer;

/***/ }),

/***/ "./client/reducers/players.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _data = __webpack_require__("./client/data.js");

var _data2 = _interopRequireDefault(_data);

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

var _common = __webpack_require__("./client/constants/common.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapSpecificPlayer = function (state, action, newPlayerFn) {
  const { playerId } = action;
  return state.map(player => {
    if (player.id === playerId) {
      return newPlayerFn(player, action);
    }
    return player;
  });
};

const applyBuyAction = (player, action) => {
  const { card: { cost }, card, bonuses } = action;

  return _extends({}, player, {
    cards: player.cards.concat([card.id]),
    reserve: [...player.reserve].filter(cardId => cardId !== card.id),
    tokens: player.tokens.map(item => {
      const neededToken = cost.find(costItem => costItem.color === item.color);
      const neededTokenAmount = neededToken ? neededToken.amount : 0;
      const availableBonus = bonuses.find(bonus => bonus.color === item.color);
      const availableBonusAmount = availableBonus ? availableBonus.amount : 0;
      const availableTokensAmount = item.amount;

      if (neededTokenAmount && neededTokenAmount > availableBonusAmount) {
        return _extends({}, item, {
          amount: availableTokensAmount - (neededTokenAmount - availableBonusAmount)
        });
      }
      return item;
    })
  });
};

const applyPickSelectedAction = (player, action) => {
  const { selectedTokens } = action;
  return _extends({}, player, {
    tokens: player.tokens.map(token => {
      if (selectedTokens.includes(token.color)) {
        return _extends({}, token, {
          amount: token.amount + 1
        });
      }
      return token;
    })
  });
};

const applyPickDoubleAction = (player, action) => {
  const { selectedToken } = action;
  return _extends({}, player, {
    tokens: player.tokens.map(token => {
      if (selectedToken === token.color) {
        return _extends({}, token, {
          amount: token.amount + 2
        });
      }
      return token;
    })
  });
};

const applyHoldCardAction = (player, action) => {
  const { card } = action;
  return _extends({}, player, {
    reserve: player.reserve.concat([card.id]),
    tokens: player.tokens.map(token => {
      if (token.color === _common.COLORS.GOLD) {
        return _extends({}, token, {
          amount: token.amount + 1
        });
      }
      return token;
    })
  });
};

const players = function (state = (0, _commmon.playersSelector)(_data2.default), action) {

  switch (action.type) {
    case _actionTypes.BUY_CARD:
      {
        return mapSpecificPlayer(state, action, applyBuyAction);
      }

    case _actionTypes.PICK_SELECTED:
      {
        return mapSpecificPlayer(state, action, applyPickSelectedAction);
      }

    case _actionTypes.PICK_DOUBLE:
      {
        return mapSpecificPlayer(state, action, applyPickDoubleAction);
      }

    case _actionTypes.HOLD_CARD:
      {
        return mapSpecificPlayer(state, action, applyHoldCardAction);
      }

    default:
      {
        return state;
      }
  }
};

exports.default = players;

/***/ }),

/***/ "./client/reducers/tokens.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = __webpack_require__("./client/data.js");

var _data2 = _interopRequireDefault(_data);

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

var _tokens = __webpack_require__("./client/selectors/tokens.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tokens = function (state = (0, _tokens.tokensSelector)(_data2.default), action) {

  switch (action.type) {

    case _actionTypes.PICK_SELECTED:
      {
        const { selectedTokens } = action;
        const newState = [...state];
        selectedTokens.forEach(color => {
          const token = newState.find(token => token.color === color);
          token.amount -= 1;
        });

        return newState;
      }

    case _actionTypes.PICK_DOUBLE:
      {
        const { selectedToken } = action;
        const newState = [...state];
        const token = newState.find(token => token.color === selectedToken);
        token.amount -= 2;
        return newState;
      }

    default:
      {
        return state;
      }
  }
};

exports.default = tokens;

/***/ }),

/***/ "./client/reducers/turn.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = __webpack_require__("./client/actions/actionTypes.js");

var _data = __webpack_require__("./client/data.js");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const toggleSelection = function (selectedTokens, color) {
  if (selectedTokens.length === 3 && !selectedTokens.includes(color)) {
    return { selectedTokens };
  }

  if (selectedTokens.includes(color)) {
    return { selectedTokens: selectedTokens.filter(token => token !== color) };
  } else {
    return { selectedTokens: selectedTokens.concat([color]) };
  }
};

const turn = function (state = _data2.default.turn, action) {
  switch (action.type) {
    case _actionTypes.TOGGLE_TOKEN_SELECTION:
      {
        return toggleSelection(state.selectedTokens, action.color);
      }

    case _actionTypes.PICK_SELECTED:
      {
        return {
          selectedTokens: []
        };
      }

    case _actionTypes.PICK_DOUBLE:
      {
        return {
          selectedTokens: []
        };
      }

    default:
      {
        return state;
      }
  }
};

exports.default = turn;

/***/ }),

/***/ "./client/scense/Game/components/Board/components/Cards/components/Deck/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("./client/scense/Game/components/Board/components/Cards/components/Deck/styles.scss");

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'deck';

function Deck({ deck: { level, cards }, className }) {
  const blockClasses = (0, _classnames2.default)(`${BLOCK}`, className, { [`${BLOCK}--empty`]: cards.length === 0 });

  return _react2.default.createElement(
    'div',
    { className: blockClasses },
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__count` },
      cards.length
    ),
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__level` },
      level
    )
  );
}

Deck.propTypes = {
  className: _propTypes2.default.string,
  deck: _propTypes2.default.object
};

exports.default = Deck;

/***/ }),

/***/ "./client/scense/Game/components/Board/components/Cards/components/Deck/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Board/components/Cards/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/Board/components/Cards/styles.scss");

var _Deck = __webpack_require__("./client/scense/Game/components/Board/components/Cards/components/Deck/index.jsx");

var _Deck2 = _interopRequireDefault(_Deck);

var _Card = __webpack_require__("./client/scense/Game/components/Card/index.jsx");

var _Card2 = _interopRequireDefault(_Card);

var _reactAddonsCssTransitionGroup = __webpack_require__("./node_modules/react-addons-css-transition-group/index.js");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _common = __webpack_require__("./client/constants/common.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'cards';
const Cards = function ({ cards, decks, getCard, onCardBuy, onCardHold }) {
  return _react2.default.createElement(
    'div',
    { className: `${BLOCK}` },
    decks.map((deck, index) => _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      {
        key: index,
        className: `${BLOCK}__deck-container`,
        component: 'div',
        transitionName: 'example',
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500 },
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__card-container` },
        _react2.default.createElement(_Deck2.default, { deck: deck })
      ),
      cards.map(cardId => getCard(cardId)).filter(card => card.level === deck.level).map(card => _react2.default.createElement(
        'div',
        { key: card.id, className: `${BLOCK}__card-container` },
        _react2.default.createElement(_Card2.default, { type: _common.CARD_VIEW_TYPE.BOARD, card: card, onHoldClick: onCardHold, onBuyClick: onCardBuy })
      ))
    ))
  );
};

Cards.propTypes = {
  cards: _propTypes2.default.array,
  decks: _propTypes2.default.array,
  getCard: _propTypes2.default.func,
  onCardBuy: _propTypes2.default.func,
  onCardHold: _propTypes2.default.func
};

exports.default = Cards;

/***/ }),

/***/ "./client/scense/Game/components/Board/components/Cards/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Board/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__("./client/scense/Game/components/Board/styles.scss");

var _NoblesList = __webpack_require__("./client/scense/Game/components/NoblesList/index.jsx");

var _NoblesList2 = _interopRequireDefault(_NoblesList);

var _TokensStack = __webpack_require__("./client/scense/Game/components/TokensStack/index.jsx");

var _TokensStack2 = _interopRequireDefault(_TokensStack);

var _Cards = __webpack_require__("./client/scense/Game/components/Board/components/Cards/index.jsx");

var _Cards2 = _interopRequireDefault(_Cards);

var _reactRedux = __webpack_require__("./node_modules/react-redux/es/index.js");

var _player = __webpack_require__("./client/actions/player.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

var _tokens = __webpack_require__("./client/actions/tokens.js");

var _cards = __webpack_require__("./client/selectors/cards.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'board';

const renderTokens = function (tokens, selectedTokens, onPickSelected, onPickDouble, onTokenSelected) {
  const pickSelectedHidden = !selectedTokens.length;
  const pickDoubleHidden = !selectedTokens.length || selectedTokens.length > 1;

  return _react2.default.createElement(
    'div',
    { className: `${BLOCK}__tokens` },
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__tokens-actions` },
      _react2.default.createElement(
        'button',
        { className: `${BLOCK}__tokens-action-button`, hidden: pickSelectedHidden, onClick: onPickSelected },
        'Pick selected'
      ),
      _react2.default.createElement(
        'button',
        { className: `${BLOCK}__tokens-action-button`, hidden: pickDoubleHidden, onClick: onPickDouble },
        'Pick double'
      )
    ),
    tokens.filter(token => token.amount > 0).map((token, index) => _react2.default.createElement(
      'div',
      { key: token.color, className: `${BLOCK}__token-container` },
      _react2.default.createElement(_TokensStack2.default, { isSelected: selectedTokens.includes(token.color), onSelected: onTokenSelected,
        amount: token.amount, color: token.color, isSelectable: true })
    ))
  );
};

const Board = function ({ className, tokens, turn: { selectedTokens }, onPickSelected, onPickDouble, nobles, board: { cards, decks }, getCard, onCardBuy, onCardHold, onTokenSelected }) {
  const blockClasses = (0, _classnames2.default)(`${BLOCK}`, className);

  return _react2.default.createElement(
    'div',
    { className: blockClasses },
    _react2.default.createElement(_NoblesList2.default, { nobles: nobles }),
    _react2.default.createElement(_Cards2.default, { cards: cards, decks: decks, getCard: getCard, onCardBuy: onCardBuy, onCardHold: onCardHold }),
    renderTokens(tokens, selectedTokens, onPickSelected, onPickDouble, onTokenSelected)
  );
};

const mapStateToProps = state => {
  return {
    turn: (0, _commmon.turn)(state),
    board: (0, _commmon.board)(state),
    nobles: (0, _commmon.noblesSelector)(state),
    tokens: (0, _commmon.tokens)(state),
    getCard: cardId => (0, _cards.cardSelector)(cardId)(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTokenSelected: color => {
      dispatch((0, _tokens.toggleTokenSelection)(color));
    },
    onPickSelected: () => {
      dispatch((0, _player.pickSelected)());
    },
    onPickDouble: () => {
      dispatch((0, _player.pickDouble)());
    },
    onCardHold: cardId => {
      dispatch((0, _player.holdCard)(cardId));
    },
    onCardBuy: cardId => {
      dispatch((0, _player.buyCard)(cardId));
    }
  };
};

Board.propTypes = {
  className: _propTypes2.default.string,
  board: _propTypes2.default.object,
  turn: _propTypes2.default.object,
  decks: _propTypes2.default.array,
  nobles: _propTypes2.default.array,
  tokens: _propTypes2.default.array,
  getCard: _propTypes2.default.func,
  onTokenSelected: _propTypes2.default.func,
  onPickSelected: _propTypes2.default.func,
  onPickDouble: _propTypes2.default.func,
  onCardHold: _propTypes2.default.func,
  onCardBuy: _propTypes2.default.func
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Board);

/***/ }),

/***/ "./client/scense/Game/components/Board/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Bonus/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__("./client/scense/Game/components/Bonus/styles.scss");

var _helpers = __webpack_require__("./client/scense/Game/helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'bonus';

const getBlockClasses = function (color, className) {
  return (0, _classnames2.default)(className, BLOCK, (0, _helpers.getColorModifier)(BLOCK, color));
};

const Bonus = function ({ amount, color, className }) {
  return _react2.default.createElement(
    'div',
    { className: getBlockClasses(color, className) },
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__amount` },
      amount
    )
  );
};

Bonus.propTypes = {
  color: _propTypes2.default.string,
  amount: _propTypes2.default.number,
  className: _propTypes2.default.string
};

exports.default = Bonus;

/***/ }),

/***/ "./client/scense/Game/components/Bonus/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Card/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("./client/scense/Game/components/Card/styles.scss");

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _common = __webpack_require__("./client/constants/common.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'card';

class Card extends _react.Component {

  constructor(props) {
    super(props);

    this.handleHoldClick = this.handleHoldClick.bind(this);
    this.handleBuyClick = this.handleBuyClick.bind(this);
  }

  getCostTokenClasses(color, type) {
    return (0, _classnames2.default)(`${BLOCK}__cost-token`, `${BLOCK}__cost-token--${color}`, { [`${BLOCK}__cost-token--reserved`]: type === _common.CARD_VIEW_TYPE.RESERVED });
  }

  getBonusClasses(color, type) {
    return (0, _classnames2.default)(`${BLOCK}__bonus`, `${BLOCK}__bonus--${color}`);
  }

  handleHoldClick() {
    const { card, onHoldClick } = this.props;
    onHoldClick(card.id);
  }

  handleBuyClick() {
    const { card, onBuyClick } = this.props;
    onBuyClick(card.id);
  }

  render() {
    const { card: { prestige, bonus, cost }, type, owner, activePlayer } = this.props;

    const holdActionPossible = type === _common.CARD_VIEW_TYPE.BOARD;
    const buyActionPossible = type === _common.CARD_VIEW_TYPE.BOARD || type === _common.CARD_VIEW_TYPE.RESERVED && owner === activePlayer;

    const hasPossibleActions = buyActionPossible || holdActionPossible;
    const blockClasses = (0, _classnames2.default)(BLOCK, {
      [`${BLOCK}--reserved`]: type === _common.CARD_VIEW_TYPE.RESERVED,
      [`${BLOCK}--available`]: activePlayer === owner,
      [`${BLOCK}--has-actions`]: hasPossibleActions
    });

    return _react2.default.createElement(
      'div',
      { className: blockClasses },
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__top-container` },
        _react2.default.createElement(
          'div',
          { className: `${BLOCK}__prestige` },
          prestige
        ),
        _react2.default.createElement('div', { className: this.getBonusClasses(bonus) })
      ),
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__cost` },
        cost.map((cost, index) => _react2.default.createElement(
          'div',
          { className: this.getCostTokenClasses(cost.color, type), key: index },
          cost.amount
        ))
      ),
      hasPossibleActions && _react2.default.createElement(
        'div',
        { className: `${BLOCK}__actions` },
        buyActionPossible && _react2.default.createElement(
          'button',
          { className: `${BLOCK}__action-button`, onClick: this.handleBuyClick },
          'Buy'
        ),
        holdActionPossible && _react2.default.createElement(
          'button',
          { className: `${BLOCK}__action-button`, onClick: this.handleHoldClick },
          'Hold'
        )
      )
    );
  }
}

Card.propTypes = {
  className: _propTypes2.default.string,
  type: _propTypes2.default.string,
  card: _propTypes2.default.object,
  onHoldClick: _propTypes2.default.func,
  onBuyClick: _propTypes2.default.func
};

exports.default = Card;

/***/ }),

/***/ "./client/scense/Game/components/Card/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Chat/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("./client/scense/Game/components/Chat/styles.scss");

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'chat';

class Chat extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {}, _temp;
  }

  render() {
    const blockClasses = (0, _classnames2.default)(`${BLOCK}`, this.props.className);
    return _react2.default.createElement(
      'div',
      { className: blockClasses },
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__title` },
        'Chat'
      )
    );
  }
}

Chat.propTypes = {
  className: _propTypes2.default.string
};

exports.default = Chat;

/***/ }),

/***/ "./client/scense/Game/components/Chat/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/GameLog/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("./client/scense/Game/components/GameLog/styles.scss");

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'game-log';

class GameLog extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {}, _temp;
  }

  render() {
    const blockClasses = (0, _classnames2.default)(`${BLOCK}`, this.props.className);
    return _react2.default.createElement(
      'div',
      { className: blockClasses },
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__title` },
        'Game log'
      ),
      _react2.default.createElement(
        'ul',
        { className: `${BLOCK}__events-list` },
        _react2.default.createElement(
          'li',
          { className: `${BLOCK}__events-list-item` },
          'Game started!'
        )
      )
    );
  }
}

GameLog.propTypes = {
  className: _propTypes2.default.string,
  events: _propTypes2.default.array
};

exports.default = GameLog;

/***/ }),

/***/ "./client/scense/Game/components/GameLog/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/NoblesList/components/Noble/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/NoblesList/components/Noble/styles.scss");

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _Bonus = __webpack_require__("./client/scense/Game/components/Bonus/index.jsx");

var _Bonus2 = _interopRequireDefault(_Bonus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'noble';
const Noble = function ({ type, noble }) {
  const { bonuses, prestige } = noble;
  const blockClasses = (0, _classnames2.default)(`${BLOCK}`);
  return _react2.default.createElement(
    'div',
    { className: blockClasses },
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__prestige` },
      _react2.default.createElement(
        'span',
        null,
        prestige
      )
    ),
    Object.keys(bonuses).map((color, index) => _react2.default.createElement(_Bonus2.default, { amount: bonuses[color], color: color, key: index }))
  );
};

Noble.propTypes = {
  className: _propTypes2.default.string,
  noble: _propTypes2.default.object
};

exports.default = Noble;

/***/ }),

/***/ "./client/scense/Game/components/NoblesList/components/Noble/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/NoblesList/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/NoblesList/styles.scss");

var _Noble = __webpack_require__("./client/scense/Game/components/NoblesList/components/Noble/index.jsx");

var _Noble2 = _interopRequireDefault(_Noble);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'nobles-list';
const NoblesList = function ({ nobles }) {
  return _react2.default.createElement(
    'div',
    { className: `${BLOCK}` },
    nobles.map((noble, index) => _react2.default.createElement(_Noble2.default, { key: index, noble: noble }))
  );
};

NoblesList.propTypes = {
  nobles: _propTypes2.default.array
};

exports.default = NoblesList;

/***/ }),

/***/ "./client/scense/Game/components/NoblesList/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerBonuses/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerBonuses/styles.scss");

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _common = __webpack_require__("./client/constants/common.js");

var _Bonus = __webpack_require__("./client/scense/Game/components/Bonus/index.jsx");

var _Bonus2 = _interopRequireDefault(_Bonus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAmount = function (cards, color, getCard) {
  return cards.map(getCard).reduce((acc, curr) => {
    if (curr.bonus === color) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const BLOCK = 'player-bonuses';
const PlayerBonuses = function ({ cards, getCard }) {

  const bonuses = _common.BONUS_COLORS.filter(color => getAmount(cards, color, getCard) > 0).map((color, index) => _react2.default.createElement(
    'div',
    { key: index, className: `${BLOCK}__bonus-container` },
    _react2.default.createElement(_Bonus2.default, { amount: getAmount(cards, color, getCard), color: color })
  ));

  return _react2.default.createElement(
    'div',
    { className: `${BLOCK}` },
    bonuses
  );
};

PlayerBonuses.propTypes = {};

exports.default = PlayerBonuses;

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerBonuses/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerTokens/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerTokens/styles.scss");

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _TokensStack = __webpack_require__("./client/scense/Game/components/TokensStack/index.jsx");

var _TokensStack2 = _interopRequireDefault(_TokensStack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'player-tokens';
const PlayerTokens = function ({ tokens, className }) {
  const _tokens = tokens.filter(token => token.amount > 0).map((token, index) => _react2.default.createElement(
    'div',
    { key: index, className: `${BLOCK}__token-container` },
    _react2.default.createElement(_TokensStack2.default, { amount: token.amount, color: token.color, isSelectable: false, minimized: true })
  ));

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(BLOCK, className) },
    _tokens
  );
};

PlayerTokens.propTypes = {};

exports.default = PlayerTokens;

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerTokens/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/components/ReservedCards/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/components/ReservedCards/styles.scss");

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = __webpack_require__("./node_modules/react-addons-css-transition-group/index.js");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Card = __webpack_require__("./client/scense/Game/components/Card/index.jsx");

var _Card2 = _interopRequireDefault(_Card);

var _common = __webpack_require__("./client/constants/common.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'reserved-cards';
const ReservedCards = function ({ playerInformation: { reserve, id }, getCard, onCardBuy, className, activePlayer }) {
  return _react2.default.createElement(
    _reactAddonsCssTransitionGroup2.default,
    {
      className: (0, _classnames2.default)(BLOCK, className),
      component: 'div',
      transitionName: 'example',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500 },
    reserve.map(cardId => _react2.default.createElement(
      'div',
      { key: cardId, className: `${BLOCK}__reserved-card-container` },
      _react2.default.createElement(_Card2.default, { type: _common.CARD_VIEW_TYPE.RESERVED, activePlayer: activePlayer, owner: id, card: getCard(cardId), onBuyClick: onCardBuy })
    ))
  );
};

ReservedCards.propTypes = {};

exports.default = ReservedCards;

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/components/ReservedCards/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/styles.scss");

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _ReservedCards = __webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/components/ReservedCards/index.jsx");

var _ReservedCards2 = _interopRequireDefault(_ReservedCards);

var _reactRedux = __webpack_require__("./node_modules/react-redux/es/index.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

var _player = __webpack_require__("./client/actions/player.js");

var _player2 = __webpack_require__("./client/selectors/player.js");

var _cards = __webpack_require__("./client/selectors/cards.js");

var _PlayerTokens = __webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerTokens/index.jsx");

var _PlayerTokens2 = _interopRequireDefault(_PlayerTokens);

var _PlayerBonuses = __webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/components/PlayerBonuses/index.jsx");

var _PlayerBonuses2 = _interopRequireDefault(_PlayerBonuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'player-information';

const mapStateToProps = state => {
  return {
    players: (0, _commmon.playersSelector)(state),
    getCard: cardId => (0, _cards.cardSelector)(cardId)(state),
    getPlayerPoints: playerId => (0, _player2.playerPointsSelector)(playerId)(state),
    activePlayer: (0, _commmon.activePlayerIdSelector)(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCardBuy: cardId => {
      dispatch((0, _player.buyCard)(cardId));
    }
  };
};

const PlayerInformation = function ({ playerInformation: { id, tokens, cards }, activePlayer, getPlayerPoints, playerInformation, onCardBuy, getCard }) {
  const blockClasses = (0, _classnames2.default)(BLOCK, { [`${BLOCK}--active-player`]: activePlayer === id });

  return _react2.default.createElement(
    'div',
    { className: blockClasses },
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__stats` },
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__title` },
        id
      ),
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__prestige` },
        'Points: ',
        getPlayerPoints(playerInformation)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__main` },
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__left-container` },
        _react2.default.createElement(_PlayerTokens2.default, { tokens: tokens, className: `${BLOCK}__tokens` }),
        _react2.default.createElement(_PlayerBonuses2.default, { cards: cards, getCard: getCard })
      ),
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__right-container ` },
        _react2.default.createElement(_ReservedCards2.default, {
          className: `${BLOCK}__reserved-cards`,
          playerInformation: playerInformation,
          activePlayer: activePlayer,
          getCard: getCard,
          onCardBuy: onCardBuy })
      )
    )
  );
};

PlayerInformation.propTypes = {
  playerInformation: _propTypes2.default.object
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PlayerInformation);

/***/ }),

/***/ "./client/scense/Game/components/Players/components/PlayerInformation/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/Players/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/Players/styles.scss");

var _PlayerInformation = __webpack_require__("./client/scense/Game/components/Players/components/PlayerInformation/index.jsx");

var _PlayerInformation2 = _interopRequireDefault(_PlayerInformation);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'players';

const Players = function ({ players, className }) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(BLOCK, className) },
    players.map(playerInformation => _react2.default.createElement(
      'div',
      { key: playerInformation.id, className: `${BLOCK}__player-information-container` },
      _react2.default.createElement(_PlayerInformation2.default, {
        playerInformation: playerInformation })
    ))
  );
};

exports.default = Players;

/***/ }),

/***/ "./client/scense/Game/components/Players/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/TokensStack/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__("./client/scense/Game/components/TokensStack/styles.scss");

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _Token = __webpack_require__("./client/scense/Game/components/TokensStack/сomponents/Token/index.jsx");

var _Token2 = _interopRequireDefault(_Token);

var _reactAddonsCssTransitionGroup = __webpack_require__("./node_modules/react-addons-css-transition-group/index.js");

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'tokens-stack';
class TokensStack extends _react.Component {

  constructor(props) {
    super(props);

    this.handleSelection = this.handleSelection.bind(this);
  }
  handleSelection() {

    const { isSelectable, color } = this.props;
    if (!isSelectable) {
      return;
    }

    this.props.onSelected(color);
  }

  render() {
    const { amount, color, minimized, isSelected } = this.props;
    const blockClasses = (0, _classnames2.default)(BLOCK, {
      [`${BLOCK}--minimized`]: minimized,
      [`${BLOCK}--selected`]: isSelected });
    const tokens = [];

    for (let i = 0; i < amount; i++) {
      tokens.push(_react2.default.createElement(_Token2.default, { key: i, color: color, amount: amount, minimized: minimized, onSelected: this.handleSelection, isSelected: isSelected && i === amount - 1 }));
    }
    return _react2.default.createElement(
      'div',
      { className: blockClasses },
      _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
          transitionName: 'example',
          component: 'div',
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 500 },
        tokens
      )
    );
  }
}

TokensStack.propTypes = {
  className: _propTypes2.default.string,
  color: _propTypes2.default.string,
  amount: _propTypes2.default.number,
  isSelected: _propTypes2.default.bool,
  isSelectable: _propTypes2.default.bool,
  onSelected: _propTypes2.default.func,
  minimized: _propTypes2.default.bool
};

exports.default = TokensStack;

/***/ }),

/***/ "./client/scense/Game/components/TokensStack/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/components/TokensStack/сomponents/Token/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = undefined;

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__("./client/scense/Game/components/TokensStack/сomponents/Token/styles.scss");

var _helpers = __webpack_require__("./client/scense/Game/helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'token';
const noop = function () {};
const Token = exports.Token = function ({ color, amount, onSelected, className, isSelected, minimized }) {

  const blockClasses = (0, _classnames2.default)(className, `${BLOCK}`, (0, _helpers.getColorModifier)(BLOCK, color), {
    [`${BLOCK}--selected`]: isSelected,
    [`${BLOCK}--minimized`]: minimized
  });

  return _react2.default.createElement(
    'div',
    { className: blockClasses, tabIndex: 1, onClick: onSelected },
    _react2.default.createElement(
      'div',
      { className: `${BLOCK}__icon` },
      _react2.default.createElement(
        'div',
        { className: `${BLOCK}__amount` },
        amount
      )
    )
  );
};

Token.propTypes = {
  className: _propTypes2.default.string,
  color: _propTypes2.default.string,
  amount: _propTypes2.default.number,
  onSelected: _propTypes2.default.func,
  isSelected: _propTypes2.default.bool,
  isSelectable: _propTypes2.default.bool,
  minimized: _propTypes2.default.bool
};

Token.defaultProps = {
  isSelected: false,
  onClick: noop,
  isSelectable: false
};

exports.default = Token;

/***/ }),

/***/ "./client/scense/Game/components/TokensStack/сomponents/Token/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/scense/Game/helpers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColorModifier = getColorModifier;

var _common = __webpack_require__("./client/constants/common.js");

function getColorModifier(block, color) {
  const modifiers = {
    [_common.COLORS.RED]: 'red',
    [_common.COLORS.BLACK]: 'black',
    [_common.COLORS.WHITE]: 'white',
    [_common.COLORS.BLUE]: 'blue',
    [_common.COLORS.GREEN]: 'green',
    [_common.COLORS.GOLD]: 'gold'
  };

  return `${block}--${modifiers[color]}`;
}

/***/ }),

/***/ "./client/scense/Game/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("./client/scense/Game/styles.scss");

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Board = __webpack_require__("./client/scense/Game/components/Board/index.jsx");

var _Board2 = _interopRequireDefault(_Board);

var _Chat = __webpack_require__("./client/scense/Game/components/Chat/index.jsx");

var _Chat2 = _interopRequireDefault(_Chat);

var _GameLog = __webpack_require__("./client/scense/Game/components/GameLog/index.jsx");

var _GameLog2 = _interopRequireDefault(_GameLog);

var _Players = __webpack_require__("./client/scense/Game/components/Players/index.jsx");

var _Players2 = _interopRequireDefault(_Players);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BLOCK = 'game';

const Game = exports.Game = function ({ board, turn, activePlayer, nobles, tokens, onTokenSelected, onPickSelected, getCard, onCardBuy, onCardHold, players }) {
  return _react2.default.createElement(
    'div',
    { className: BLOCK },
    _react2.default.createElement(_Players2.default, { players: players, className: `${BLOCK}__players-information` }),
    _react2.default.createElement(_Board2.default, {
      className: `${BLOCK}__board`,
      activePlayer: activePlayer,
      board: board, turn: turn, nobles: nobles, tokens: tokens,
      onTokenSelected: onTokenSelected,
      onPickSelected: onPickSelected,
      onCardHold: onCardHold,
      onCardBuy: onCardBuy,
      getCard: getCard })
  );
};

Game.propTypes = {
  getCard: _propTypes2.default.func,
  onCardBuy: _propTypes2.default.func,
  onCardHold: _propTypes2.default.func,
  players: _propTypes2.default.array
};

exports.default = Game;

/***/ }),

/***/ "./client/scense/Game/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./client/selectors/cards.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardOwnerSelector = exports.cardPrestigeSelector = exports.cardCostSelector = exports.cardSelector = undefined;

var _reselect = __webpack_require__("./node_modules/reselect/lib/index.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

var _player = __webpack_require__("./client/selectors/player.js");

const cardSelector = exports.cardSelector = cardId => (0, _reselect.createSelector)(_commmon.cardsSelector, cards => cards.find(card => card.id === cardId));

const cardCostSelector = exports.cardCostSelector = card => card.cost;

const cardPrestigeSelector = exports.cardPrestigeSelector = card => card.prestige;

const cardOwnerSelector = exports.cardOwnerSelector = cardId => (0, _reselect.createSelector)(_commmon.playersSelector, players => players.find(player => (0, _player.playerReservedCardsSelector)(player).includes(cardId)));

/***/ }),

/***/ "./client/selectors/commmon.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.turn = turn;
exports.tokens = tokens;
exports.noblesSelector = noblesSelector;
exports.board = board;
function turn(state) {
  return state.turn;
}

function tokens(state) {
  return state.tokens;
}

function noblesSelector(state) {
  return state.nobles;
}

function board(state) {
  return state.board;
}

const playersSelector = exports.playersSelector = state => state.players;

const cardsSelector = exports.cardsSelector = state => state.cards;

const activePlayerIdSelector = exports.activePlayerIdSelector = state => state.activePlayer;

/***/ }),

/***/ "./client/selectors/nobles.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.noblePrestigeSelector = exports.nobleSelector = undefined;

var _reselect = __webpack_require__("./node_modules/reselect/lib/index.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

const nobleSelector = exports.nobleSelector = nobleId => (0, _reselect.createSelector)(_commmon.noblesSelector, nobles => nobles.find(nobleId));

const noblePrestigeSelector = exports.noblePrestigeSelector = noble => noble.prestige;

/***/ }),

/***/ "./client/selectors/player.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerBonusesSelector = exports.playerPointsSelector = exports.playerReservedCardsSelector = exports.playerNoblesSelector = exports.playerTokensSelector = exports.playerCardsSelector = exports.playerByOrderSelector = exports.playerSelector = exports.playersCountSelector = undefined;

var _reselect = __webpack_require__("./node_modules/reselect/lib/index.js");

var _commmon = __webpack_require__("./client/selectors/commmon.js");

var _nobles = __webpack_require__("./client/selectors/nobles.js");

var _cards = __webpack_require__("./client/selectors/cards.js");

const playersCountSelector = exports.playersCountSelector = state => state.players.length;

const playerSelector = exports.playerSelector = playerId => (0, _reselect.createSelector)(_commmon.playersSelector, players => players.find(player => player.id === playerId));

const playerByOrderSelector = exports.playerByOrderSelector = order => (0, _reselect.createSelector)(_commmon.playersSelector, players => players.find(player => player.order === order));

const playerCardsSelector = exports.playerCardsSelector = player => player.cards;

const playerTokensSelector = exports.playerTokensSelector = player => player.tokens;

const playerNoblesSelector = exports.playerNoblesSelector = player => player.nobles;

const playerReservedCardsSelector = exports.playerReservedCardsSelector = player => player.reserve;

const playerPointsSelector = exports.playerPointsSelector = player => (0, _reselect.createSelector)(_commmon.noblesSelector, _commmon.cardsSelector, (nobles, cards) => {
  const playerNoblesIds = playerNoblesSelector(player);
  const playerNobles = playerNoblesIds.map(nobleId => nobles.find(noble => noble.id === nobleId));
  const noblesPoints = playerNobles.reduce((acc, curr) => acc + (0, _nobles.noblePrestigeSelector)(curr), 0);

  const playerCardsIds = playerCardsSelector(player);
  const playerCards = playerCardsIds.map(cardId => cards.find(card => card.id === cardId));
  const cardsPoints = playerCards.reduce((acc, curr) => acc + (0, _cards.cardPrestigeSelector)(curr), 0);

  return cardsPoints + noblesPoints;
});

const playerBonusesSelector = exports.playerBonusesSelector = playerId => (0, _reselect.createSelector)(playerSelector(playerId), _commmon.cardsSelector, (player, cards) => {
  const playerCards = playerCardsSelector(player).map(cardId => cards.find(card => card.id === cardId));
  const _bonuses = playerCards.reduce((acc, curr) => {
    const color = curr.bonus;
    if (acc[color]) {
      acc[color] += 1;
    } else {
      acc[color] = 1;
    }
    return acc;
  }, {});
  return Object.keys(_bonuses).map(color => {
    return { color: color, amount: _bonuses[color] };
  });
});

/***/ }),

/***/ "./client/selectors/tokens.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenByColorSelector = exports.tokensSelector = undefined;

var _reselect = __webpack_require__("./node_modules/reselect/lib/index.js");

const tokensSelector = exports.tokensSelector = state => state.tokens;

const tokenByColorSelector = exports.tokenByColorSelector = color => (0, _reselect.createSelector)(tokensSelector, tokens => tokens.find(token => token.color === color));

/***/ }),

/***/ "./client/store/configureStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__("./client/store/configureStore.prod.js");
} else {
  module.exports = require('./configureStore.dev');
}

/***/ }),

/***/ "./client/store/configureStore.prod.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__("./node_modules/redux/es/index.js");

var _reduxThunk = __webpack_require__("./node_modules/redux-thunk/lib/index.js");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__("./client/reducers/index.js");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configureStore = preloadedState => (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
// import api from '../middleware/api'
exports.default = configureStore;

/***/ }),

/***/ "./client/styles.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/react-addons-css-transition-group/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



module.exports = __webpack_require__("./node_modules/react-transition-group/CSSTransitionGroup.js");


/***/ }),

/***/ "./node_modules/react-hot-loader/lib/patch.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable global-require */

if (true) {
  module.exports = __webpack_require__("./node_modules/react-hot-loader/lib/patch.prod.js");
} else {
  module.exports = require('./patch.dev');
}

/***/ }),

/***/ "./node_modules/react-hot-loader/lib/patch.prod.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* noop */


/***/ }),

/***/ "./node_modules/react-hot-loader/patch.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/react-hot-loader/lib/patch.js")


/***/ }),

/***/ "./node_modules/react-transition-group/CSSTransitionGroup.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = __webpack_require__("./node_modules/react-transition-group/TransitionGroup.js");

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _CSSTransitionGroupChild = __webpack_require__("./node_modules/react-transition-group/CSSTransitionGroupChild.js");

var _CSSTransitionGroupChild2 = _interopRequireDefault(_CSSTransitionGroupChild);

var _PropTypes = __webpack_require__("./node_modules/react-transition-group/utils/PropTypes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  transitionName: _PropTypes.nameShape.isRequired,

  transitionAppear: _propTypes2.default.bool,
  transitionEnter: _propTypes2.default.bool,
  transitionLeave: _propTypes2.default.bool,
  transitionAppearTimeout: (0, _PropTypes.transitionTimeout)('Appear'),
  transitionEnterTimeout: (0, _PropTypes.transitionTimeout)('Enter'),
  transitionLeaveTimeout: (0, _PropTypes.transitionTimeout)('Leave')
};

var defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};

var CSSTransitionGroup = function (_React$Component) {
  _inherits(CSSTransitionGroup, _React$Component);

  function CSSTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
      return _react2.default.createElement(_CSSTransitionGroupChild2.default, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // We need to provide this childFactory so that
  // ReactCSSTransitionGroupChild can receive updates to name, enter, and
  // leave while it is leaving.


  CSSTransitionGroup.prototype.render = function render() {
    return _react2.default.createElement(_TransitionGroup2.default, _extends({}, this.props, { childFactory: this._wrapChild }));
  };

  return CSSTransitionGroup;
}(_react2.default.Component);

CSSTransitionGroup.displayName = 'CSSTransitionGroup';


CSSTransitionGroup.propTypes =  false ? propTypes : {};
CSSTransitionGroup.defaultProps = defaultProps;

exports.default = CSSTransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-transition-group/CSSTransitionGroupChild.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _addClass = __webpack_require__("./node_modules/dom-helpers/class/addClass.js");

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__("./node_modules/dom-helpers/class/removeClass.js");

var _removeClass2 = _interopRequireDefault(_removeClass);

var _requestAnimationFrame = __webpack_require__("./node_modules/dom-helpers/util/requestAnimationFrame.js");

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _properties = __webpack_require__("./node_modules/dom-helpers/transition/properties.js");

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _PropTypes = __webpack_require__("./node_modules/react-transition-group/utils/PropTypes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = [];
if (_properties.transitionEnd) events.push(_properties.transitionEnd);
if (_properties.animationEnd) events.push(_properties.animationEnd);

function addEndListener(node, listener) {
  if (events.length) {
    events.forEach(function (e) {
      return node.addEventListener(e, listener, false);
    });
  } else {
    setTimeout(listener, 0);
  }

  return function () {
    if (!events.length) return;
    events.forEach(function (e) {
      return node.removeEventListener(e, listener, false);
    });
  };
}

var propTypes = {
  children: _propTypes2.default.node,
  name: _PropTypes.nameShape.isRequired,

  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: _propTypes2.default.bool,
  enter: _propTypes2.default.bool,
  leave: _propTypes2.default.bool,
  appearTimeout: _propTypes2.default.number,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number
};

var CSSTransitionGroupChild = function (_React$Component) {
  _inherits(CSSTransitionGroupChild, _React$Component);

  function CSSTransitionGroupChild() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillAppear = function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    }, _this.componentWillEnter = function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    }, _this.componentWillLeave = function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  };

  CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  };

  CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback, timeout) {
    var node = (0, _reactDom.findDOMNode)(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timer = null;
    var removeListeners = void 0;

    (0, _addClass2.default)(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // Clean-up the animation after the specified delay
    var finish = function finish(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timer);
      if (removeListeners) removeListeners();

      (0, _removeClass2.default)(node, className);
      (0, _removeClass2.default)(node, activeClassName);

      if (removeListeners) removeListeners();

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (timeout) {
      timer = setTimeout(finish, timeout);
      this.transitionTimeouts.push(timer);
    } else if (_properties.transitionEnd) {
      removeListeners = addEndListener(node, finish);
    }
  };

  CSSTransitionGroupChild.prototype.queueClassAndNode = function queueClassAndNode(className, node) {
    var _this2 = this;

    this.classNameAndNodeQueue.push({
      className: className,
      node: node
    });

    if (!this.rafHandle) {
      this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
        return _this2.flushClassNameAndNodeQueue();
      });
    }
  };

  CSSTransitionGroupChild.prototype.flushClassNameAndNodeQueue = function flushClassNameAndNodeQueue() {
    if (!this.unmounted) {
      this.classNameAndNodeQueue.forEach(function (obj) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        /* eslint-disable no-unused-expressions */
        obj.node.scrollTop;
        /* eslint-enable no-unused-expressions */
        (0, _addClass2.default)(obj.node, obj.className);
      });
    }
    this.classNameAndNodeQueue.length = 0;
    this.rafHandle = null;
  };

  CSSTransitionGroupChild.prototype.render = function render() {
    var props = _extends({}, this.props);
    delete props.name;
    delete props.appear;
    delete props.enter;
    delete props.leave;
    delete props.appearTimeout;
    delete props.enterTimeout;
    delete props.leaveTimeout;
    delete props.children;
    return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), props);
  };

  return CSSTransitionGroupChild;
}(_react2.default.Component);

CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';


CSSTransitionGroupChild.propTypes =  false ? propTypes : {};

exports.default = CSSTransitionGroupChild;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-transition-group/TransitionGroup.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = __webpack_require__("./node_modules/chain-function/index.js");

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__("./node_modules/warning/browser.js");

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = __webpack_require__("./node_modules/react-transition-group/utils/ChildMapping.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

         false ? (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of TransitionGroup and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute') : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes =  false ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-transition-group/utils/ChildMapping.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__("./node_modules/react/index.js");

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),

/***/ "./node_modules/react-transition-group/utils/PropTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.nameShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var nameShape = exports.nameShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  leaveActive: _propTypes2.default.string,
  appear: _propTypes2.default.string,
  appearActive: _propTypes2.default.string
})]);

/***/ }),

/***/ "./node_modules/redux-thunk/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;

/***/ }),

/***/ "./node_modules/reselect/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;
function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = defaultMemoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/react-hot-loader/patch.js");
__webpack_require__("./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__("./client/index.jsx");


/***/ })

},[0]);
//# sourceMappingURL=app.915d8cf8a8b9164691a8.js.map