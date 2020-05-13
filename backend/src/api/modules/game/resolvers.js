import gameService from '../../../modules/game/services/game.service';
import { authorizeGameAdmin } from './authorizers';

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

export async function gameFirstTeamResolver(game) {
  return gameService.getFirstTeamById(game.id);
}

export async function gameSecondTeamResolver(game) {
  return gameService.getSecondTeamById(game.id);
}

export async function discardGameResolver(parent, { id }, { currentUser }) {
  await authorizeGameAdmin(currentUser.id, id);
  const discartedGame = await gameService.discardGameById(id);
  return discartedGame.id;
}
