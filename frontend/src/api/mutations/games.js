import gql from 'graphql-tag';

export const CREATE_GAME = gql`
  mutation createGame($game: GameInput!) {
    createGame(game: $game)
  }
`;

export const JOIN_GAME = gql`
  mutation joinGame($id: ID!) {
    joinGame(id: $id)
  }
`;