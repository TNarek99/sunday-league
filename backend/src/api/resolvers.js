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
  gameAverageRatingResolver,
} from './modules/game/resolvers';
import { teamPlayersResolver, playerUserResolver } from './modules/team/resolvers';
import { notificationsResolver, updateNotificationStatusResolver, deleteNotificationResolver } from './modules/notification/resolvers';
import { DateTimeResolver, EmailResolver, RatingScoreResolver } from './modules/customTypes/resolvers';
import { createInvitationResolver, acceptInvitationResolver, rejectInvitationResolver } from './modules/scheduler/resolvers';

const resolvers = {
  Query: {
    currentUser: currentUserResolver,
    openGames: combineResolvers(requiresToBeActive, openGamesResolver),
    notifications: combineResolvers(requiresToBeActive, notificationsResolver),
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
    updateNotificationStatus: combineResolvers(requiresToBeActive, updateNotificationStatusResolver),
    deleteNotification: combineResolvers(requiresToBeActive, deleteNotificationResolver),
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
    rating: gameAverageRatingResolver,
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
