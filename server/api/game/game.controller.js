import state from './initial-state';

function initialState(req, res) {
  return res.status(200).json(state);
}
export default { initialState };
