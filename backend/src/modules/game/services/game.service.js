import teamService from '../../team/services/team.service';
import playerService from '../../team/services/player.service';
import models from '../../../database';
import ForbiddenError from '../../../common/ForbiddenError';
import BadInputError from '../../../common/BadInputError';
import NotFoundError from '../../../common/NotFoundError';
import { calculateConsecutiveMatchStatus } from '../utils/game.utils';
import {
  MESSAGE_PLAYER_ALREADY_EXISTS,
  MESSAGE_GAME_CAPACITY_FULL,
  MESSAGE_FORBIDDEN_MATCH_STATUS_UPDATE,
  MESSAGE_GAME_NOT_FOUND,
  MESSAGE_SCORES_NOT_PROVIDED,
  MESSAGE_GAME_NOT_PENDING,
  STATUS_FINISHED,
  STATUS_PENDING,
  MESSAGE_RATING_NOT_FOUND,
  STATUS_DISCARTED,
} from '../constants';

class GameService {
  async getOpenGames() {
    return models.game.getOpenGames();
  }

  async getFirstTeamById(id) {
    const game = await this.getGameById(id);
    return this.getFirstTeam(game);
  }

  async getSecondTeamById(id) {
    const game = await this.getGameById(id);
    return this.getSecondTeam(game);
  }

  async getPlayers(game) {
    const firstTeam = await this.getFirstTeam(game);
    const secondTeam = await this.getSecondTeam(game);
    const firstTeamPlayers = await teamService.getPlayers(firstTeam);
    const secondTeamPlayers = await teamService.getPlayers(secondTeam);
    return { firstTeamPlayers, secondTeamPlayers };
  }

  async getFirstTeam(game) {
    return game.getFirstTeam();
  }

  async getSecondTeam(game) {
    return game.getSecondTeam();
  }

  async getRatingGameByRatingId(id) {
    const rating = await this.getRatingById(id);
    return this.getRatingGame(rating);
  }

  async getRatingGame(rating) {
    return rating.getGame();
  }

  async getRatingPlayerByRatingId(id) {
    const rating = await this.getRatingById(id);
    return this.getRatingPlayer(rating);
  }

  async getRatingPlayer(rating) {
    return rating.getPlayer();
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

  async updateGameById(id, gameData) {
    const game = await this.getGameById(id);
    return this.updateGame(game, gameData);
  }

  async updateGame(game, gameData) {
    await this.validateUpdateGame(game);
    return game.update(gameData);
  }

  async updateMatchStatusById(id, matchStatus, firstTeamScore, secondTeamScore) {
    const game = await this.getGameById(id);
    return this.updateMatchStatus(game, matchStatus, firstTeamScore, secondTeamScore);
  }

  async getGameById(id) {
    const game = await models.game.findById(id);
    if (!game) {
      throw new NotFoundError(MESSAGE_GAME_NOT_FOUND);
    }
    return game;
  }

  async getRatingById(id) {
    const rating = await models.rating.findById(id);
    if (!rating) {
      throw new NotFoundError(MESSAGE_RATING_NOT_FOUND);
    }
    return rating;
  }

  async updateMatchStatus(game, matchStatus, firstTeamScore, secondTeamScore) {
    await this.validateUpdateMatchStatus(game, matchStatus, firstTeamScore, secondTeamScore);
    const gameData = { matchStatus, firstTeamScore, secondTeamScore };
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

  async getGameRatingsById(id) {
    const game = await this.getGameById(id);
    return this.getGameRatings(game);
  }

  async getGameRatings(game) {
    return game.getRatings();
  }

  async rateGameByGameIdAndUserId(gameId, userId, ratingData) {
    const game = await this.getGameById(gameId);
    const player = await playerService.getPlayerByUserIdAndGameId(userId, gameId);
    return this.rateGame(game, player, ratingData);
  }

  async rateGame(game, player, ratingData) {
    await this.validateRateGame(game);
    const rating = await this.getGameRatingByPlayer(game, player);
    if (rating) {
      return rating.update(ratingData);
    }
    return models.rating.createRating(ratingData, player, game);
  }

  async getGameRatingByPlayer(game, player) {
    return models.rating.findRatingByGameAndPlayer(game, player);
  }

  async discardGameById(id) {
    const game = await this.getGameById(id);
    return this.discardGame(game);
  }

  async discardGame(game) {
    await this.validateDiscardGame(game);
    return game.update({ status: STATUS_DISCARTED });
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

    if (game.matchStatus !== STATUS_PENDING) {
      throw new ForbiddenError(MESSAGE_GAME_NOT_PENDING);
    }
  }

  async validateUpdateMatchStatus(game, matchStatus, firstTeamScore, secondTeamScore) {
    if (matchStatus !== calculateConsecutiveMatchStatus(game.matchStatus)) {
      throw new ForbiddenError(MESSAGE_FORBIDDEN_MATCH_STATUS_UPDATE);
    }
    if (matchStatus === STATUS_FINISHED && (!firstTeamScore || !secondTeamScore)) {
      const errorPayload = {
        firstTeamScore: true,
        secondTeamScore: true,
      };
      throw new BadInputError(MESSAGE_SCORES_NOT_PROVIDED, errorPayload);
    }
  }

  async validateUpdateGame(game) {
    if (game.matchStatus !== STATUS_PENDING) {
      throw new ForbiddenError(MESSAGE_GAME_NOT_PENDING);
    }
  }

  async validateDiscardGame(game) {
    if (game.matchStatus !== STATUS_PENDING) {
      throw new ForbiddenError(MESSAGE_GAME_NOT_PENDING);
    }
  }

  async validateRateGame(game) {
    if (game.matchStatus !== STATUS_FINISHED) {
      throw new ForbiddenError(MESSAGE_PLAYER_ALREADY_EXISTS);
    }
  }

  async getGameAverageRatingById(gameId) {
    const game = await this.getGameById(gameId);
    return this.getGameAverageRating(game);
  }

  async getGameAverageRating(game) {
    return game.getRating();
  }
}

const gameService = new GameService();
export default gameService;
