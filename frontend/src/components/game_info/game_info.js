import React from 'react';

import './styles.css';

const GameInfo = ({
  date,
  location,
  booked,
  matchStatus,
  rating,
  teamCapacity,
  firstTeamScore,
  secondTeamScore,
}) => (
    <div className="game-info">
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
      <p className="game-item-score game-prop">
        {firstTeamScore ? firstTeamScore : 'No score'}
      </p>
      <p className="game-item-score game-prop">
        {secondTeamScore ? secondTeamScore : 'No score'}
      </p>
    </div>
  );

export default GameInfo;