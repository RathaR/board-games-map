import {GAMES, NEW_GAME_STATE} from './initial-state';

const gameStateStorage = {
  '1': {...NEW_GAME_STATE},
  '2': {...NEW_GAME_STATE},
  '3': {...NEW_GAME_STATE}
};

const sessionsStorage = [...GAMES];

class StateController {

  static getState(req, res) {
    const {params: {id}} = req;

    return res.status(200).json(gameStateStorage[id]);
  }

  static getAll(req, res) {
    return res.status(200).json(sessionsStorage);
  }
}

export default StateController;
