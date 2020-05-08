import models from '../../../database';

class PlayerService {
  async createPlayer(user, team) {
    return models.player.createPlayer(user, team);
  }
}

const playerService = new PlayerService();
export default playerService;
