import teamService from '../../team/services/team.service';
import playerService from '../../team/services/player.service';
import models from '../../../database';

class GameService {
  async getOpenGames() {
    return models.game.getOpenGames();
  }

  async createGame(gameData, user) {
    const firstTeam = await teamService.createTeam();
    const secondTeam = await teamService.createTeam();
    const game = await models.game.createGame(gameData, user, firstTeam, secondTeam);
    await playerService.createPlayer(user, firstTeam);
    return game;
  }
}

const gameService = new GameService();
export default gameService;
