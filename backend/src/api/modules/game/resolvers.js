import gameService from '../../../modules/game/services/game.service';

export async function createGameResolver(parent, { game }, { currentUser }) {
  return gameService.createGame(game, currentUser);
}
