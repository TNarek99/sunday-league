import { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../queries/users';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState(null);

  const [fetchCurrentUser, { loading }] = useLazyQuery(CURRENT_USER_QUERY, {
    onCompleted: ({ currentUser }) => {
      setCurrentUser(currentUser);
    },
    onError: (error) => {
      setCurrentUser(null);
      setErrors(error);
    },
    fetchPolicy: 'network-only',
  });

  return { currentUser, fetchCurrentUser, errors, loading };
};