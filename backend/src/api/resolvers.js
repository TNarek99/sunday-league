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
  gameFirstTeamResolver,
  gameSecondTeamResolver,
  ratingPlayerResolver,
  gameRatingsResolver,
  ratingGameResolver,
  discardGameResolver,
} from './modules/game/resolvers';
import { DateTimeResolver, EmailResolver, RatingScoreResolver } from './modules/customTypes/resolvers';
import { createInvitationResolver, acceptInvitationResolver, rejectInvitationResolver } from './modules/scheduler/resolvers';
import { DateTimeResolver, EmailResolver } from './modules/customTypes/resolvers';
import { teamPlayersResolver, playerUserResolver } from './modules/team/resolvers';

const resolvers = {
  Query: {
    currentUser: currentUserResolver,
    openGames: combineResolvers(requiresToBeActive, openGamesResolver),
    gameRatings: combineResolvers(requiresToBeActive, gameRatingsResolver),
  },
  Mutation: {
    activateUser: combineResolvers(requiresToBeNonActive, activateUserResolver),
    updateUser: combineResolvers(requiresToBeActive, updateUserResolver),
    createGame: combineResolvers(requiresToBeActive, createGameResolver),
    joinGame: combineResolvers(requiresToBeActive, joinGameResolver),
    discardGame: combineResolvers(requiresToBeActive, discardGameResolver),
    updateMatchStatus: combineResolvers(requiresToBeActive, updateMatchStatusResolver),
    updateGame: combineResolvers(requiresToBeActive, updateGameResolver),
    rateGame: combineResolvers(requiresToBeActive, rateGameResolver),
    createInvitation: combineResolvers(requiresToBeActive, createInvitationResolver),
    acceptInvitation: combineResolvers(requiresToBeActive, acceptInvitationResolver),
    rejectInvitation: combineResolvers(requiresToBeActive, rejectInvitationResolver),
  },
  DateTime: DateTimeResolver,
  Email: EmailResolver,
  RatingScore: RatingScoreResolver,
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
  },
};

export default resolvers;
