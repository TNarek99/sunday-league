import models from '../../../database';

class TeamService {
  async createTeam() {
    return models.team.create();
  }
}

const teamService = new TeamService();
export default teamService;
