import { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../queries/users';
import { ACTIVATE_USER } from '../mutations/users';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({ signedIn: false, loaded: false });
  const [errors, setErrors] = useState(null);

  const [fetchCurrentUser, { loading }] = useLazyQuery(CURRENT_USER_QUERY, {
    onCompleted: ({ currentUser }) => {
      setCurrentUser({ ...currentUser, signedIn: true, loaded: true });
    },
    onError: (error) => {
      setCurrentUser({ signedIn: false, loaded: true });
      setErrors(error);
    },
    fetchPolicy: 'network-only',
  });

  return { currentUser, fetchCurrentUser, errors, loading };
};

export const useActivateUser = () => {
  const [errors, setErrors] = useState(null);

  const [activateUser, { data, loading }] = useMutation(ACTIVATE_USER, {
    onError: (error) => {
      setErrors(error);
    }
  });

  return { activateUser: (userInput) => activateUser({ variables: { user: userInput } }), loading, errors };
};