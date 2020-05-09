import gameService from '../../../modules/game/services/game.service';

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
