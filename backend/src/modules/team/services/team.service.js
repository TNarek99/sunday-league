import models from '../../../database';
import NotFoundError from '../../../common/NotFoundError';
import { MESSAGE_TEAM_NOT_FOUND } from '../constants';

class TeamService {
  async createTeam(teamData) {
    return models.team.create(teamData);
  }

  async getPlayersById(id) {
    const team = await this.getTeamById(id);
    return this.getPlayers(team);
  }

  async getPlayers(team) {
    return team.getPlayers();
  }

  async getTeamPlayerCount(team) {
    return models.team.getPlayersCountById(team.id);
  }

  async getTeamById(id) {
    const team = await models.team.findById(id);
    if (!team) {
      throw NotFoundError(MESSAGE_TEAM_NOT_FOUND);
    }
    return team;
  }
}

const teamService = new TeamService();
export default teamService;
