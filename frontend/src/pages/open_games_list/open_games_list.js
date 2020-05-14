import React, { useContext, useEffect } from 'react';
import GameContext from '../../contexts/game/game_context';
import GameListItem from '../../components/game_list_item/game_list_item';
import GameListHeader from '../../components/game_list_header/game_list_header';

const OpenGamesList = () => {
  const { getOpenGames, openGames, joinGame } = useContext(GameContext);

  useEffect(() => {
    getOpenGames();
  }, [getOpenGames]);

  if (!openGames) {
    return <p>There are no open games at this moment</p>
  }

  return (
    <div className="games-list">
      <GameListHeader />
      {openGames.map(game =>
        <GameListItem
          key={game.id}
          {...game}
          onJoinClick={() => joinGame(game.id)}
        />)}
    </div>
  )
};

export default OpenGamesList;
