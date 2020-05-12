import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const GameListHeader = () => (
  <div className="game-list-header">
    <p>
      Date
    </p>
    <p>
      Location
    </p>
    <p>
      Status
    </p>
    <p>
      Match Status
    </p>
    <p>
      Rating
    </p>
    <button className="create-game-button">
      <Link to="/games/create">Create</Link>
    </button>
  </div>
);

export default GameListHeader;