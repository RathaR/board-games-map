import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './styles.scss';
import {gamesSelector} from '../../selectors/common';
import {fetchGames} from "../../actions/fetchGames";

const GameListItem = function ({gameInfo}) {
  const BLOCK = 'games-list-item';
  return(
    <div className={BLOCK}>
      <div className={`${BLOCK}__column`}>
        {gameInfo.players} Players
      </div>
      <div className={`${BLOCK}__column`}>
          <Link to={`/game/${gameInfo.id}`}>Open</Link>
      </div>
    </div>
  );
};

class GamesList extends Component {
  componentDidMount() {
    const {fetchGames} = this.props;
    fetchGames();
  }
  render() {
    const {games: {items, loading}} = this.props;
    const BLOCK = 'games-list';
    return (
      <div className={BLOCK}>
        {loading && <div className={`${BLOCK}__loading`}>Loading...</div>}
        {items.map(gameInfo => <GameListItem key={gameInfo.id} gameInfo={gameInfo}/>)}
      </div>
    )
  };
}

GamesList.propTypes = {
  games: PropTypes.shape({
    loading: PropTypes.bool,
    items: PropTypes.array,
    error: PropTypes.object,
  }),
};

const mapStateToProps = state => {
  return {
    games: gamesSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: () => dispatch(fetchGames())
  }
};

const ConnectedRooms = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesList);

export default ConnectedRooms;
