import models from '../../../database';
import teamService from './team.service';
import ForbiddenError from '../../../common/ForbiddenError';
import NotFoundError from '../../../common/NotFoundError';
import { MESSAGE_TEAM_CAPACITY_FULL, MESSAGE_PLAYER_NOT_FOUND } from '../constants';

class PlayerService {
  async createPlayer(user, team) {
    await this.validateCreatePlayer(team);
    return models.player.createPlayer(user, team);
  }

  async getUserById(id) {
    const player = await this.getPlayerById(id);
    return this.getUser(player);
  }

  async getUser(player) {
    return player.getUser();
  }

  async getPlayerByUserAndGame(user, game) {
    return models.player.getPlayerByUserAndGame(user, game);
  }

  async getPlayerById(id) {
    const player = await models.player.findById(id);
    if (!player) {
      throw new NotFoundError(MESSAGE_PLAYER_NOT_FOUND);
    }
    return player;
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
