import React, { useState, useCallback, useContext } from 'react';
import GameListItem from '../game_list_item/game_list_item';
import GameInfo from '../game_info/game_info';
import GameListHeader from '../game_list_header/game_list_header';

import './styles.css';
import { GAME_STATUS_PENDING, GAME_STATUS_STARTED } from '../../common/constants/games';
import UserContext from '../../contexts/user/user_context';

const GameSummary = ({ game, onUpdateMatchStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const [firstTeamScore, setFirtTeamScore] = useState(0);
  const [secondTeamScore, setSecondTeamScore] = useState(0);
  const { handleUpdateMatchStatus } = useContext(UserContext);

  return (
    <div className="game-summary">
      <div className="short-summary">
        <div className="short-summary-info">
          <GameInfo {...game} />
          {
            game.matchStatus === GAME_STATUS_STARTED &&
            <div>
              <input type="number" value={firstTeamScore} onChange={(e) => setFirtTeamScore(e.target.value)} />
              <input type="number" value={secondTeamScore} onChange={(e) => setSecondTeamScore(e.target.value)} />
            </div>
          }
          <button className="expand-button" onClick={() => setExpanded(!expanded)}>
            expand
          </button>
          <button className="update-status" onClick={() => handleUpdateMatchStatus(game.id, firstTeamScore, secondTeamScore)}>
            Update Status
          </button>
        </div>
      </div>
      {expanded &&
        <div className="expanded-summary">
          <div className="expanded-team">
            <p>First Team</p>
            {game.firstTeam.players.map(player => <p>{player.firstName}</p>)}
          </div>
          <div className="expanded-team">
            <p>Second Team</p>
            {game.secondTeam.players.map(player => <p>{player.firstName}</p>)}
          </div>
        </div>
      }
    </div>
  )
};

export default GameSummary;