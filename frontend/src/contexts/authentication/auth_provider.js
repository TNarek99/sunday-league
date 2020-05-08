import React, { useEffect, useState } from 'react';
import UserContext from './user_context';
import firebase from 'firebase';
import { useCurrentUser } from '../../api/services/users';

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ loaded: false, signedIn: false });
  const [errors, setErrors] = useState(null);

  const { fetchCurrentUser } = useCurrentUser(
    ({ currentUser }) => setCurrentUser({ ...currentUser, loaded: true, signedIn: true }),
    ({ error }) => setCurrentUser({ loaded: true, signedIn: false })
  );

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
    <UserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
};

export default AuthProvider;