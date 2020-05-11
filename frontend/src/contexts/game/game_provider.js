import React, { useState, useCallback } from 'react';
import GameContext from './game_context';
import { useCreateGame, useFetchOpenGames, useJoinGame } from '../../api/services/games';

const GameProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [openGames, setOpenGames] = useState([]);
  const [currentUserGames, setCurrentUserGames] = useState([]);

  const { createGame } = useCreateGame({
    onCompleted: () => { console.log('Game Created') },
    onError: () => { console.log('Error occured') },
  });

  const { fetchOpenGames } = useFetchOpenGames({
    onCompleted: ({ openGames }) => setOpenGames(openGames),
    onError: ({ error }) => { setErrors({}) },
  });

  const { joinGame } = useJoinGame({
    onCompleted: () => { },
    onError: (errors) => setErrors({ join: errors.message }),
  });

  return (
    <GameContext.Provider value={{
      createGame,
      openGames,
      getOpenGames: fetchOpenGames,
      joinGame,
      currentUserGames,
    }}>
      {children}
    </GameContext.Provider>
  )
};

export default GameProvider;