import models from '../../../database';
import userService from '../../user/services/user.service';
import gameService from '../../game/services/game.service';
import playerService from '../../team/services/player.service';
import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_FORBIDDEN_INVITATION_EXISTING_PLAYER } from '../constants';

class InvitationService {
  async createInvitationByUserIdAndGameId(userId, gameId) {
    const user = await userService.getUserById(userId);
    const game = await gameService.getGameById(gameId);
    return this.createInvitation(user, game);
  }

  async createInvitation(user, game) {
    await this.validateCreateInvitation(user, game);
    return models.invitation.createInvitation(user, game);
  }

  async validateCreateInvitation(user, game) {
    const existingPlayer = await playerService.getPlayerByUserAndGame(user, game);
    if (existingPlayer) {
      throw new ForbiddenError(MESSAGE_FORBIDDEN_INVITATION_EXISTING_PLAYER);
    }
  }
}

const invitationService = new InvitationService();
export default invitationService;
