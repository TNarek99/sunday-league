import models from '../../../database';

class GameService {
  async createGame(gameData, userData) {
    const game = await models.game.create({ ...gameData, userId: userData.id });
    return game.id;
  }
}

const gameService = new GameService();
export default gameService;
