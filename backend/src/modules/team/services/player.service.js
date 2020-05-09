import models from '../../../database';
import teamService from './team.service';
import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_TEAM_CAPACITY_FULL } from '../constants';

class PlayerService {
  async createPlayer(user, team) {
    await this.validateCreatePlayer(team);
    return models.player.createPlayer(user, team);
  }

  async getPlayerByUserAndGame(user, game) {
    return models.player.getPlayerByUserAndGame(user, game);
  }

  async validateCreatePlayer(team) {
    const teamPlayerCount = await teamService.getTeamPlayerCount(team);
    if (teamPlayerCount === team.capacity) {
      throw new ForbiddenError(MESSAGE_TEAM_CAPACITY_FULL);
    }
  }
}

const playerService = new PlayerService();
export default playerService;
