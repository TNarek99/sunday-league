import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      firebaseId
      firstName
      lastName
      status 
    }
  }
`;