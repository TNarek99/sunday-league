import { combineResolvers } from 'graphql-resolvers';
import { requiresToBeActive, requiresToBeNonActive } from './modules/authorization/resolvers';
import { activateUserResolver, currentUserResolver, updateUserResolver } from './modules/user/resolvers';
import {
  openGamesResolver,
  createGameResolver,
  joinGameResolver,
  updateMatchStatusResolver,
  updateGameResolver,
} from './modules/game/resolvers';
import { createInvitationResolver } from './modules/scheduler/resolvers';
import { DateTimeResolver, EmailResolver } from './modules/customTypes/resolvers';


const resolvers = {
  Query: {
    currentUser: currentUserResolver,
    openGames: combineResolvers(requiresToBeActive, openGamesResolver),
  },
  Mutation: {
    activateUser: combineResolvers(requiresToBeNonActive, activateUserResolver),
    updateUser: combineResolvers(requiresToBeActive, updateUserResolver),
    createGame: combineResolvers(requiresToBeActive, createGameResolver),
    joinGame: combineResolvers(requiresToBeActive, joinGameResolver),
    updateMatchStatus: combineResolvers(requiresToBeActive, updateMatchStatusResolver),
    updateGame: combineResolvers(requiresToBeActive, updateGameResolver),
    createInvitation: combineResolvers(requiresToBeActive, createInvitationResolver),
  },
  DateTime: DateTimeResolver,
  Email: EmailResolver,
};

export default resolvers;
