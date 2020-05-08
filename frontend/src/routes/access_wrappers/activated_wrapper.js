import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import UserContext from '../../contexts/authentication/user_context';
import { STATUS_ACTIVE } from '../../common/constants/users';

const ActivatedWrapper = ({ children }, ...rest) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser.loaded) {
    return <p>Loading...</p>
  }

  if (!currentUser.signedIn || currentUser.status !== STATUS_ACTIVE) {
    return <Redirect to="/activate" />
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
};

export default ActivatedWrapper;