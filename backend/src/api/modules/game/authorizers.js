import gameService from '../../../modules/game/services/game.service';
import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_FORBIDDEN } from '../../../common/constants';
import playerService from '../../../modules/team/services/player.service';

export async function authorizeGameAdmin(userId, gameId) {
  const game = await gameService.getGameById(gameId);
  // TODO: Deal with integer IDs
  if (String(game.adminId) !== userId) {
    throw new ForbiddenError(MESSAGE_FORBIDDEN);
  }
}

export async function authorizeGamePlayer(currentUser, gameId) {
  const player = await playerService.getPlayerByUserIdAndGameId(currentUser.id, gameId);
  if (!player) {
    throw new ForbiddenError(MESSAGE_FORBIDDEN);
  }
}
