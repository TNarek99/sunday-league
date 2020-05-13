import notificationService from '../../../modules/notification/services/notification.service';
import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_FORBIDDEN } from '../../../common/constants';

export async function authorizeNotificationUser(notificationId, userId) {
  const notification = await notificationService.getNotificationById(notificationId);
  if (String(notification.userId) !== userId) {
    throw new ForbiddenError(MESSAGE_FORBIDDEN);
  }
}
