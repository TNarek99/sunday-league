import models from '../../../database';
import userService from '../../user/services/user.service';
import gameService from '../../game/services/game.service';
import playerService from '../../team/services/player.service';
import ForbiddenError from '../../../common/ForbiddenError';
import NotFoundError from '../../../common/NotFoundError';
import {
  MESSAGE_INVITATION_NOT_FOUND,
  MESSAGE_FORBIDDEN_INVITATION_EXISTING_PLAYER,
  MESSAGE_FORBIDDEN_INVITATION_ACCEPT,
  MESSAGE_FORBIDDEN_INVITATION_REJECT,
  STATUS_INVITATION_PENDING,
  STATUS_INVITATION_REJECTED,
  STATUS_INVITATION_ACCEPTED,
} from '../constants';
import { STATUS_PENDING, MESSAGE_GAME_NOT_PENDING } from '../../game/constants';

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

  async rejectInvitationById(id) {
    const invitation = await this.getInvitationById(id);
    return this.rejectInvitation(invitation);
  }

  async acceptInvitation(invitation) {
    await this.validateAcceptInvitation(invitation);
    const user = await this.getUser(invitation);
    const game = await this.getGame(invitation);
    await gameService.joinGame(game, user);
    return invitation.update({ status: STATUS_INVITATION_ACCEPTED });
  }

  async rejectInvitation(invitation) {
    await this.validateRejectInvitation(invitation);
    return invitation.update({ status: STATUS_INVITATION_REJECTED });
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
    if (game.matchStatus !== STATUS_PENDING) {
      throw new ForbiddenError(MESSAGE_GAME_NOT_PENDING);
    }
  }

  async validateAcceptInvitation(invitation) {
    if (invitation.status !== STATUS_INVITATION_PENDING) {
      throw new ForbiddenError(MESSAGE_FORBIDDEN_INVITATION_ACCEPT);
    }
  }

  async validateRejectInvitation(invitation) {
    if (invitation.status !== STATUS_INVITATION_PENDING) {
      throw new ForbiddenError(MESSAGE_FORBIDDEN_INVITATION_REJECT);
    }
  }
}

const invitationService = new InvitationService();
export default invitationService;
