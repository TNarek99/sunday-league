import gql from 'graphql-tag';

export const GET_OPEN_GAMES = gql`
  query {
    openGames {
      id
      date
      location
      teamCapacity
      matchStatus
      booked
      rating
    } 
  }
`;