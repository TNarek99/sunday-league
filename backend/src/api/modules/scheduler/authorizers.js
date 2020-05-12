import invitationService from '../../../modules/scheduler/services/invitation.service';
import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_FORBIDDEN } from '../../../common/constants';

export async function authorizeInvitationUser(invitationId, userId) {
  const invitation = await invitationService.getInvitationById(invitationId);
  if (String(invitation.userId) !== userId) {
    throw new ForbiddenError(MESSAGE_FORBIDDEN);
  }
}
