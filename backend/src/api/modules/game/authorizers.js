import gameService from '../../../modules/game/services/game.service';
import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_FORBIDDEN } from '../../../common/constants';

export async function authorizeGameAdmin(currentUser, gameId) {
  const game = await gameService.getGameById(gameId);
  // TODO: Deal with integer IDs
  if (String(game.adminId) !== currentUser.id) {
    throw new ForbiddenError(MESSAGE_FORBIDDEN);
  }
}
