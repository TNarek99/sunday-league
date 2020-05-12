import { combineResolvers } from 'graphql-resolvers';
import { requiresToBeActive, requiresToBeNonActive } from './modules/authorization/resolvers';
import { activateUserResolver, currentUserResolver, updateUserResolver } from './modules/user/resolvers';
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
};

export default resolvers;
