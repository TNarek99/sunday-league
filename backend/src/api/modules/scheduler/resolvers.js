import invitationService from '../../../modules/scheduler/services/invitation.service';
import { authorizeInvitationUser } from './authorizers';
import { authorizeGameAdmin } from '../game/authorizers';

export async function createInvitationResolver(
  parent,
  { invitation: invitationData },
  { currentUser },
) {
  const { gameId, userId } = invitationData;
  await authorizeGameAdmin(currentUser.id, gameId);
  const invitation = await invitationService.createInvitationByUserIdAndGameId(userId, gameId);
  return invitation.id;
}

export async function acceptInvitationResolver(parent, { id }, { currentUser }) {
  await authorizeInvitationUser(id, currentUser.id);
  const player = await invitationService.acceptInvitationById(id);
  return player.id;
}

export async function rejectInvitationResolver(parent, { id }, { currentUser }) {
  await authorizeInvitationUser(id, currentUser.id);
  const invitation = await invitationService.rejectInvitationById(id);
  return invitation.id;
}
