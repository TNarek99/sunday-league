import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { CREATE_GAME, JOIN_GAME } from "../mutations/games";
import { GET_OPEN_GAMES } from "../queries/games";

export const useCreateGame = ({ onCompleted, onError }) => {
  const [createGame, { data }] = useMutation(CREATE_GAME, {
    onCompleted,
    onError,
  });

  return {
    createGame: (gameInput) => {
      createGame({
        variables: { ...gameInput },
      })
    }
  }
};

export const useFetchOpenGames = ({ onCompleted, onError }) => {
  const [fetchOpenGames, { data }] = useLazyQuery(GET_OPEN_GAMES, {
    onCompleted,
    onError,
    fetchPolicy: 'network-only',
  });

  return { fetchOpenGames };
};

export const useJoinGame = ({ onCompleted, onError }) => {
  const [joinGame, { data }] = useMutation(JOIN_GAME, {
    onCompleted,
    onError,
  });

  return { joinGame: (id) => joinGame({ variables: { id } }) };
}
