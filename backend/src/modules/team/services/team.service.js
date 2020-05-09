import models from '../../../database';

class TeamService {
  async createTeam(teamData) {
    return models.team.create(teamData);
  }

  async getTeamPlayerCount(team) {
    return models.team.getPlayersCountById(team.id);
  }
}

const teamService = new TeamService();
export default teamService;
