import models from '../../../database';

class GameService {
  async getOpenGames() {
    return models.game.getOpenGames();
  }

  async createGame(gameData, userData) {
    const game = await models.game.create({ ...gameData, adminId: userData.id });
    return game.id;
  }
}

const gameService = new GameService();
export default gameService;
