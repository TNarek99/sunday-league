import gameService from '../../../modules/game/services/game.service';

export async function openGamesResolver() {
  return gameService.getOpenGames();
}

export async function createGameResolver(parent, { game }, { currentUser }) {
  return gameService.createGame(game, currentUser);
}
