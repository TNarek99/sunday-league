import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import SignInWrapper from './access_wrappers/signed_in_wrapper';
import SignIn from '../pages/sign_in/sign_in';

const DomainRoutes = () => {
  return (
    <Switch>
      <SignInWrapper path='/' exact><p>Home</p></SignInWrapper>
      <Route path='/sign-in'>
        <SignIn test="HEEE" />
      </Route>
    </Switch>
  )
};

export default DomainRoutes;