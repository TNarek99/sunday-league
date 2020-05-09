import React, { useEffect, useState } from 'react';
import UserContext from './user_context';
import firebase from 'firebase';
import { useCurrentUser, useActivateUser } from '../../api/services/users';
import { STATUS_ACTIVE } from '../../common/constants/users';

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ loaded: false, signedIn: false });
  const [errors, setErrors] = useState({});

  const { activateUser } = useActivateUser({
    onCompleted: () => setCurrentUser((currentUser) => ({ ...currentUser, status: STATUS_ACTIVE })),
    onError: ({ error }) => setErrors((errors) => ({ ...errors, activation: error })),
  });

  const { fetchCurrentUser } = useCurrentUser({
    onCompleted: ({ currentUser }) => setCurrentUser({ ...currentUser, loaded: true, signedIn: true }),
    onError: ({ error }) => {
      setCurrentUser({ loaded: true, signedIn: false });
      setErrors((errors) => ({ ...errors, auth: error }));
    },
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((authToken) => {
          console.log(authToken);
          localStorage.setItem('Authorization', authToken);
          fetchCurrentUser();
        }).catch((error) => {
          console.log(error);
          localStorage.removeItem('Authorization');
          setCurrentUser({ loaded: true, signedIn: false });
        });
      } else {
        localStorage.removeItem('Authorization');
        setCurrentUser({ loaded: true, signedIn: false });
      }
    })
  }, [fetchCurrentUser]);

  return (
    <UserContext.Provider value={{
      currentUser,
      fetchCurrentUser,
      activateUser,
      errors,
    }}>
      {children}
    </UserContext.Provider>
  )
};

export default AuthProvider;