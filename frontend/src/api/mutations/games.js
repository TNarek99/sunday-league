import gql from 'graphql-tag';

export const CREATE_GAME = gql`
  mutation createGame($game: GameInput!) {
    createGame(game: $game)
  }
`;