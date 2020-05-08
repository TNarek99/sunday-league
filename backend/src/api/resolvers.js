import { combineResolvers } from 'graphql-resolvers';
import { requiresToBeActive, requiresToBeNonActive } from './modules/authorization/resolvers';
import { activateUserResolver, currentUserResolver, updateUserResolver } from './modules/user/resolvers';
import { createGameResolver } from './modules/game/resolvers';
import { DateTimeResolver, EmailResolver } from './modules/customTypes/resolvers';


const resolvers = {
  Query: {
    currentUser: currentUserResolver,
  },
  Mutation: {
    activateUser: combineResolvers(requiresToBeNonActive, activateUserResolver),
    updateUser: combineResolvers(requiresToBeActive, updateUserResolver),
    createGame: combineResolvers(requiresToBeActive, createGameResolver),
  },
  DateTime: DateTimeResolver,
  Email: EmailResolver,
};

export default resolvers;
