import React, { useEffect } from 'react';
import UserContext from './user_context';
import firebase from 'firebase';
import { useCurrentUser } from '../../api/services/users';

const AuthProvider = ({ children }) => {
  const { fetchCurrentUser, currentUser } = useCurrentUser();

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
          fetchCurrentUser();
        });
      } else {
        localStorage.removeItem('Authorization');
        fetchCurrentUser();
      }
    })
  }, [fetchCurrentUser]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  )
};

export default AuthProvider;