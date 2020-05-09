import teamService from '../../team/services/team.service';
import playerService from '../../team/services/player.service';
import models from '../../../database';
import ForbiddenError from '../../../common/ForbiddenError';
import NotFoundError from '../../../common/NotFoundError';
import { MESSAGE_PLAYER_ALREADY_EXISTS, MESSAGE_GAME_CAPACITY_FULL, MESSAGE_GAME_NOT_FOUND } from '../constants';

class GameService {
  async getOpenGames() {
    return models.game.getOpenGames();
  }

  async createGame(gameData, user) {
    const teamData = { capacity: gameData.teamCapacity };
    const firstTeam = await teamService.createTeam(teamData);
    const secondTeam = await teamService.createTeam(teamData);
    const game = await models.game.createGame(gameData, user, firstTeam, secondTeam);
    await playerService.createPlayer(user, firstTeam);
    return game;
  }

  async joinGameById(id, user) {
    const game = await this.getGameById(id);
    return this.joinGame(game, user);
  }

  async getGameById(id) {
    const game = await models.game.findById(id);
    if (!game) {
      return NotFoundError(MESSAGE_GAME_NOT_FOUND);
    }
    return game;
  }

  async joinGame(game, user) {
    await this.validateJoinGame(game, user);
    const team = await this.getAvailableTeam(game);
    return playerService.createPlayer(user, team);
  }

  async getAvailableTeam(game) {
    const firstTeam = await game.firstTeam();
    const secondTeam = await game.secondTeam();
    const firstTeamPlayerCount = await teamService.getTeamPlayerCount(firstTeam);
    const secondTeamPlayerCount = await teamService.getTeamPlayerCount(secondTeam);
    if (firstTeam.capacity > firstTeamPlayerCount) {
      return firstTeam;
    }
    if (secondTeam.capacity > secondTeamPlayerCount) {
      return secondTeam;
    }
    return null;
  }

  async validateJoinGame(game, user) {
    const existingPlayer = await playerService.getPlayerByUserAndGame(user, game);
    if (existingPlayer) {
      throw new ForbiddenError(MESSAGE_PLAYER_ALREADY_EXISTS);
    }

    const availableTeam = await this.getAvailableTeam(game);
    if (!availableTeam) {
      throw new ForbiddenError(MESSAGE_GAME_CAPACITY_FULL);
    }
  }
}

const gameService = new GameService();
export default gameService;
