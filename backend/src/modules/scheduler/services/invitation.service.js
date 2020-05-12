import models from '../../../database';
import userService from '../../user/services/user.service';
import gameService from '../../game/services/game.service';
import playerService from '../../team/services/player.service';
import ForbiddenError from '../../../common/ForbiddenError';
import NotFoundError from '../../../common/NotFoundError';
import {
  STATUS_INVITATION_ACCEPTED,
  MESSAGE_INVITATION_NOT_FOUND,
  MESSAGE_FORBIDDEN_INVITATION_EXISTING_PLAYER,
  MESSAGE_FORBIDDEN_INVITATION_ACCEPT,
} from '../constants';

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

  async acceptInvitationById(id) {
    const invitation = await this.getInvitationById(id);
    return this.acceptInvitation(invitation);
  }

  async acceptInvitation(invitation) {
    await this.validateAcceptInvitation(invitation);
    const user = await this.getUser(invitation);
    const game = await this.getGame(invitation);
    await gameService.joinGame(game, user);
    return invitation.update({ status: STATUS_INVITATION_ACCEPTED });
  }

  async getInvitationById(id) {
    const invitation = await models.invitation.findById(id);
    if (!invitation) {
      throw new NotFoundError(MESSAGE_INVITATION_NOT_FOUND);
    }
    return invitation;
  }

  async getUser(invitation) {
    return invitation.getUser();
  }

  async getGame(invitation) {
    return invitation.getGame();
  }

  async validateCreateInvitation(user, game) {
    const existingPlayer = await playerService.getPlayerByUserAndGame(user, game);
    if (existingPlayer) {
      throw new ForbiddenError(MESSAGE_FORBIDDEN_INVITATION_EXISTING_PLAYER);
    }
  }

  async validateAcceptInvitation(invitation) {
    if (invitation.status === STATUS_INVITATION_ACCEPTED) {
      throw new ForbiddenError(MESSAGE_FORBIDDEN_INVITATION_ACCEPT);
    }
  }
}

const invitationService = new InvitationService();
export default invitationService;
