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
  gameFirstTeamResolver,
  gameSecondTeamResolver,
} from './modules/game/resolvers';
import { DateTimeResolver, EmailResolver } from './modules/customTypes/resolvers';
import { teamPlayersResolver, playerUserResolver } from './modules/team/resolvers';


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
  },
  DateTime: DateTimeResolver,
  Email: EmailResolver,
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
};

export default resolvers;
