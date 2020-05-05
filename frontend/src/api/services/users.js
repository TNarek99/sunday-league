import { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../queries/users';

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