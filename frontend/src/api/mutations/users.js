import gql from 'graphql-tag';

export const ACTIVATE_USER = gql`
  mutation acvtivateUser($user: UserInput!) {
    activateUser(user: $user) {
      status
      email
      firstName
      lastName
      shirtNumber
      firebaseId
    }
  }
`;