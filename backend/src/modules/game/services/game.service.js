import teamService from '../../team/services/team.service';
import playerService from '../../team/services/player.service';
import models from '../../../database';
import ForbiddenError from '../../../common/ForbiddenError';
import NotFoundError from '../../../common/NotFoundError';
import { calculateConsecutiveMatchStatus } from '../utils/game.utils';
import {
  STATUS_FINISHED,
  STATUS_PENDING,
  STATUS_STARTED,
  MESSAGE_PLAYER_ALREADY_EXISTS,
  MESSAGE_GAME_CAPACITY_FULL,
  MESSAGE_FORBIDDEN_MATCH_STATUS_UPDATE,
  MESSAGE_GAME_NOT_FOUND,
} from '../constants';

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

  async updateMatchStatusById(id, matchStatus) {
    const game = await this.getGameById(id);
    return this.updateMatchStatus(game, matchStatus);
  }

  async getGameById(id) {
    const game = await models.game.findById(id);
    if (!game) {
      throw new NotFoundError(MESSAGE_GAME_NOT_FOUND);
    }
    return game;
  }

  async updateMatchStatus(game, matchStatus) {
    await this.validateUpdateMatchStatus(game, matchStatus);
    const gameData = { matchStatus };
    return game.update(gameData);
  }

  async joinGame(game, user) {
    await this.validateJoinGame(game, user);
    const team = await this.getAvailableTeam(game);
    return playerService.createPlayer(user, team);
  }

  async getAvailableTeam(game) {
    const firstTeam = await game.getFirstTeam();
    const secondTeam = await game.getSecondTeam();
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

  async validateUpdateMatchStatus(game, matchStatus) {
    if (matchStatus !== calculateConsecutiveMatchStatus(game.matchStatus)) {
      throw new ForbiddenError(MESSAGE_FORBIDDEN_MATCH_STATUS_UPDATE);
    }
  }
}

const gameService = new GameService();
export default gameService;
