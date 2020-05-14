import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      firebaseId
      firstName
      lastName
      status
      createdGames {
        id
        date
        teamCapacity
        location
        type
        rating
        booked
        matchStatus
        firstTeam {
          players {
            user {
              firstName
              lastName
            }
          }
        }
        secondTeam {
          players {
            user {
              firstName
              lastName
            }
          }
        }
        firstTeamScore
        secondTeamScore
      }
    }
  }
`;