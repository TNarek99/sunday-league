import { combineResolvers } from 'graphql-resolvers';
import { requiresToBeActive, requiresToBeNonActive } from './modules/authorization/resolvers';
import {
  activateUserResolver,
  currentUserResolver,
  updateUserResolver,
  userCreatedGamesResolver,
} from './modules/user/resolvers';
import {
  openGamesResolver,
  createGameResolver,
  joinGameResolver,
  updateMatchStatusResolver,
  updateGameResolver,
  rateGameResolver,
  gameRatingsResolver
} from './modules/game/resolvers';

import { DateTimeResolver, EmailResolver, RatingResolver } from './modules/customTypes/resolvers';
import {
  gameFirstTeamResolver,
  gameSecondTeamResolver,
  ratingPlayerResolver
} from './modules/game/resolvers';
import { teamPlayersResolver, playerUserResolver } from './modules/team/resolvers';

const resolvers = {
  Query: {
    currentUser: currentUserResolver,
    openGames: combineResolvers(requiresToBeActive, openGamesResolver),
    gameRatings: combineResolvers(requiresToBeActive, gameRatingsResolver)
  },
  Mutation: {
    activateUser: combineResolvers(requiresToBeNonActive, activateUserResolver),
    updateUser: combineResolvers(requiresToBeActive, updateUserResolver),
    createGame: combineResolvers(requiresToBeActive, createGameResolver),
    joinGame: combineResolvers(requiresToBeActive, joinGameResolver),
    updateMatchStatus: combineResolvers(requiresToBeActive, updateMatchStatusResolver),
    updateGame: combineResolvers(requiresToBeActive, updateGameResolver),
    rateGame: combineResolvers(requiresToBeActive, rateGameResolver)
  },
  DateTime: DateTimeResolver,
  Email: EmailResolver,
  RatingScore: RatingResolver,
  User: {
    createdGames: userCreatedGamesResolver,
  },
  Game: {
    firstTeam: gameFirstTeamResolver,
    secondTeam: gameSecondTeamResolver,
  },
  Team: {
    players: teamPlayersResolver,
  },
  Player: {
    user: playerUserResolver,
  },
  Rating: {
    player: ratingPlayerResolver,
    game: ratingGameResolver,
  }
};

export default resolvers;
