import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import SignInWrapper from './access_wrappers/signed_in_wrapper';
import SignIn from '../pages/sign_in/sign_in';
import Activation from '../pages/activation/activation';
import ActivatedWrapper from './access_wrappers/activated_wrapper';
import GameRoutes from './game/game_routes';

const DomainRoutes = () => {
  return (
    <Switch>
      <ActivatedWrapper path='/' exact>
        <p>Home</p>
      </ActivatedWrapper>
      <Route path='/sign-in'>
        <SignIn />
      </Route>
      <SignInWrapper path='/activate' exact>
        <Activation />
      </SignInWrapper>
      <Route path='/games'>
        <GameRoutes />
      </Route>
      <Route path='*'>Not Found</Route>
    </Switch>
  )
};

export default DomainRoutes;