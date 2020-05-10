import React from 'react';
import GameContext from './game_context';
import { useCreateGame } from '../../api/services/games';

const GameProvider = ({ children }) => {
  const { createGame } = useCreateGame({
    onCompleted: () => { console.log('Game Created') },
    onError: () => { console.log('Error occured') },
  });

  return (
    <GameContext.Provider value={{
      createGame
    }}>
      {children}
    </GameContext.Provider>
  )
};

export default GameProvider;