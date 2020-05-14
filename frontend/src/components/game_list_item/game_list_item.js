import React from 'react';

import './styles.css';
import GameInfo from '../game_info/game_info';

const GameListItem = ({
  onJoinClick,
  joined,
  ...gameProps
}) => {
  return (
    <div className="game-list-item">
      <GameInfo {...gameProps} />
      <p className="game-item-join">
        {joined ? <p>Joined</p> : <button className="join-button" onClick={onJoinClick}>Join</button>}
      </p>
    </div>
  )
};

export default GameListItem;