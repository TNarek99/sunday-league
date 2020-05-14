import React, { useEffect, useState, useCallback, useMemo } from 'react';
import UserContext from './user_context';
import firebase from 'firebase';
import { useCurrentUser, useActivateUser } from '../../api/services/users';
import { useUpdateGameStatus } from '../../api/services/games';
import { GAME_STATUS_PENDING, GAME_STATUS_STARTED } from '../../common/constants/games';

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ loaded: false, signedIn: false });
  const [errors, setErrors] = useState({});

  const { activateUser } = useActivateUser({
    onCompleted: ({ activateUser: currentUser }) => setCurrentUser({ ...currentUser, loaded: true, signedIn: true }),
    onError: ({ error }) => setErrors((errors) => ({ ...errors, activation: error })),
  });

  const { fetchCurrentUser } = useCurrentUser({
    onCompleted: ({ currentUser }) => setCurrentUser({ ...currentUser, loaded: true, signedIn: true }),
    onError: ({ error }) => {
      setCurrentUser({ loaded: true, signedIn: false });
      setErrors((errors) => ({ ...errors, auth: error }));
    },
  });

  const updateLocalMathStatus = useCallback((newGame) => {
    setCurrentUser({
      ...currentUser,
      createdGames: [
        ...currentUser.createdGames.map((game) => {
          if (game.id !== newGame.id) {
            return game;
          } else {
            return { ...game, ...newGame }
          }
        })
      ]
    })
  }, [currentUser]);

  const { updateStatus } = useUpdateGameStatus({
    onCompleted: ({ updateMatchStatus: newGame }) => updateLocalMathStatus(newGame),
    onError: (errors) => setErrors({ updateStatus: errors.message }),
  });

  const currentUserGames = useMemo(() => {
    if (currentUser && currentUser.createdGames) {
      return currentUser.createdGames.map(game => (
        {
          ...game,
          firstTeam: { players: [...game.firstTeam.players.map(({ user }) => user)] },
          secondTeam: { players: [...game.secondTeam.players.map(({ user }) => user)] }
        }
      ));
    };
  }, [currentUser, currentUser.createdGames]);

  const handleUpdateMatchStatus = useCallback((gameId, firstTeamScore, secondTeamScore) => {
    const currentGame = currentUser.createdGames.find(game => game.id === gameId);

    if (currentGame.matchStatus === GAME_STATUS_PENDING) {
      updateStatus({
        id: currentGame.id,
        matchStatus: 'STARTED',
      });
    } else if (currentGame.matchStatus === GAME_STATUS_STARTED) {
      updateStatus({
        id: currentGame.id,
        matchStatus: 'FINISHED',
        firstTeamScore: Number(firstTeamScore),
        secondTeamScore: Number(secondTeamScore),
      });
    };
  }, [currentUser, updateStatus, currentUser.createdGames]);


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((authToken) => {
          console.log(authToken);
          localStorage.setItem('Authorization', authToken);
          fetchCurrentUser();
        }).catch((error) => {
          console.log(error);
          localStorage.removeItem('Authorization');
          setCurrentUser({ loaded: true, signedIn: false });
        });
      } else {
        localStorage.removeItem('Authorization');
        setCurrentUser({ loaded: true, signedIn: false });
      }
    })
  }, [fetchCurrentUser]);

  return (
    <UserContext.Provider value={{
      currentUser,
      fetchCurrentUser,
      activateUser,
      errors,
      currentUserGames,
      handleUpdateMatchStatus,
    }}>
      {children}
    </UserContext.Provider>
  )
};

export default UserProvider;