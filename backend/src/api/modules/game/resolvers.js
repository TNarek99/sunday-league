import gameService from '../../../modules/game/services/game.service';
import { authorizeGameAdmin, authorizeGamePlayer } from './authorizers';

export async function openGamesResolver() {
  return gameService.getOpenGames();
}

export async function createGameResolver(parent, { game: gameData }, { currentUser }) {
  const game = await gameService.createGame(gameData, currentUser);
  return game.id;
}

export async function joinGameResolver(parent, { id }, { currentUser }) {
  const player = await gameService.joinGameById(id, currentUser);
  return player.id;
}

export async function updateGameResolver(parent, { id, game }, { currentUser }) {
  await authorizeGameAdmin(currentUser.id, id);
  return gameService.updateGameById(id, game);
}

export async function gameRatingsResolver(parent, { gameId }) {
  return gameService.getGameRatingsById(gameId);
}

export async function updateMatchStatusResolver(parent, args, { currentUser }) {
  const {
    id,
    matchStatus,
    firstTeamScore,
    secondTeamScore,
  } = args;
  await authorizeGameAdmin(currentUser.id, id);
  return gameService.updateMatchStatusById(id, matchStatus, firstTeamScore, secondTeamScore);
}

export async function rateGameResolver(parent, { id, rating: ratingData }, { currentUser }) {
  await authorizeGamePlayer(currentUser, id);
  const rating = await gameService.rateGameByGameIdAndUserId(id, currentUser.id, ratingData);
  return rating.id;
}

export async function gameFirstTeamResolver(game) {
  return gameService.getFirstTeamById(game.id);
}

export async function ratingPlayerResolver(rating) {
  return gameService.getRatingPlayerByRatingId(rating.id);
}

export async function ratingGameResolver(rating) {
  return gameService.getRatingGameByRatingId(rating.id);
}

export async function gameSecondTeamResolver(game) {
  return gameService.getSecondTeamById(game.id);
}

export async function discardGameResolver(parent, { id }, { currentUser }) {
  await authorizeGameAdmin(currentUser.id, id);
  const discartedGame = await gameService.discardGameById(id);
  return discartedGame.id;
}
