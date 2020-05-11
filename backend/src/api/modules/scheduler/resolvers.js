import invitationService from '../../../modules/scheduler/services/invitation.service';
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
