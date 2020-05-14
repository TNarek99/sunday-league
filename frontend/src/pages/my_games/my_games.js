import React, { useContext } from 'react';
import GameSummary from '../../components/game_summary/game_summary';
import UserContext from '../../contexts/user/user_context';

const MyGames = () => {
  const { currentUserGames, updateStatus } = useContext(UserContext);

  return (
    currentUserGames.map(game => (
      <GameSummary key={game.id} game={game} onUpdateMatchStatus={updateStatus} />
    ))
  )
};

export default MyGames;