import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../queries/users';
import { ACTIVATE_USER } from '../mutations/users';

export const useCurrentUser = (onCompleted, onError) => {
  const [fetchCurrentUser, { loading }] = useLazyQuery(CURRENT_USER_QUERY, {
    onCompleted,
    onError,
    fetchPolicy: 'network-only',
  });

  return { fetchCurrentUser, loading };
};

export const useActivateUser = (onCompleted, onError) => {
  const [activateUser, { loading }] = useMutation(ACTIVATE_USER, {
    onError,
    onCompleted,
  });

  return { activateUser: (userInput) => activateUser({ variables: { user: userInput } }), loading };
};