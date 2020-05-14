import React from 'react';
import {
  Switch,
  useRouteMatch,
} from "react-router-dom";
import ActivatedWrapper from '../access_wrappers/activated_wrapper';
import CreateGame from '../../pages/create_game/create_game';
import OpenGamesList from '../../pages/open_games_list/open_games_list';
import MyGames from '../../pages/my_games/my_games';

const GameRoutes = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <ActivatedWrapper exact path={`${match.url}/`}>
        <MyGames />
      </ActivatedWrapper>
      <ActivatedWrapper exact path={`${match.url}/create`}>
        <CreateGame />
      </ActivatedWrapper>
      <ActivatedWrapper exact path={`${match.url}/manage/:gameId`}>
        Manage My Game
      </ActivatedWrapper>
      <ActivatedWrapper exact path={`${match.url}/openGames`}>
        <OpenGamesList />
      </ActivatedWrapper>
    </Switch>
  )
};

export default GameRoutes;