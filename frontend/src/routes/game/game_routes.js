import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ActivatedWrapper from '../access_wrappers/activated_wrapper';
import CreateGame from '../../pages/create_game/create_game';

const GameRoutes = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <ActivatedWrapper exact path={`${match.url}/`}>
        List of My Games
      </ActivatedWrapper>
      <ActivatedWrapper exact path={`${match.url}/create`}>
        <CreateGame />
      </ActivatedWrapper>
      <ActivatedWrapper exact path={`${match.url}/manage/:gameId`}>
        Manage My Game
      </ActivatedWrapper>
    </Switch>
  )
};

export default GameRoutes;