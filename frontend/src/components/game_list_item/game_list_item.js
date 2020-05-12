import React from 'react';

import './styles.css';

const GameListItem = ({
  date,
  location,
  booked,
  matchStatus,
  rating,
  teamCapacity,
  onJoinClick,
  joined,
}) => {
  return (
    <div className="game-list-item">
      <p className="game-item-date game-prop">
        {new Date(date).toLocaleString()}
      </p>
      <p className="game-item-location game-prop">
        {location}
      </p>
      <p className="game-item-booked game-prop">
        {booked ? 'Booked' : '-'}
      </p>
      <p className="game-item-status game-prop">
        {matchStatus}
      </p>
      <p className="game-item-rating game-prop">
        {rating ? rating : '-'}
      </p>
      <p className="game-item-join">
        {joined ? <p>Joined</p> : <button className="join-button" onClick={onJoinClick}>Join</button>}
      </p>
    </div>
  )
};

export default GameListItem;