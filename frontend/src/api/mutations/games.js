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

export const UPDATE_STATUS = gql`
  mutation updateMatchStatus($id: ID!, $matchStatus: MatchStatus!, $firstTeamScore: Int, $secondTeamScore: Int) {
    updateMatchStatus(id: $id, matchStatus: $matchStatus, firstTeamScore: $firstTeamScore, secondTeamScore: $secondTeamScore) {
      id
      matchStatus
      firstTeamScore
      secondTeamScore
    }
  }
`;