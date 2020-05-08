import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import UserContext from '../../contexts/authentication/user_context';

const ActivatedWrapper = ({ children }, ...rest) => {
  const { currentUser } = useContext(UserContext);

  if (currentUser && !currentUser.loaded) {
    return <p>Loading...</p>
  }

  if (currentUser && currentUser.signedIn && currentUser.status !== 'ACTIVE') {
    return <Redirect to="/activate" />
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
};

export default ActivatedWrapper;