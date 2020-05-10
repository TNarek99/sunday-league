import { useMutation } from "@apollo/react-hooks";
import { CREATE_GAME } from "../mutations/games";

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
