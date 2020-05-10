import gameService from '../../../modules/game/services/game.service';
import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_FORBIDDEN } from '../../../common/constants';

export async function authorizeUpdateMatchStatus(currentUser, queryArgs) {
  const game = await gameService.getGameById(queryArgs.id);
  if (game.adminId !== currentUser.id) {
    throw new ForbiddenError(MESSAGE_FORBIDDEN);
  }
}
