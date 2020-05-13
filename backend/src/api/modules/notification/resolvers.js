import notificationService from '../../../modules/notification/services/notification.service';
import { authorizeNotificationUser } from './authorizers';

export async function notificationsResolver(parent, args, { currentUser }) {
  return notificationService.getNotificationsByUserId(currentUser.id);
}

export async function updateNotificationStatusResolver(parent, { id, status }, { currentUser }) {
  await authorizeNotificationUser(id, currentUser.id);
  return notificationService.updateNotificationStatusById(id, status);
}

export async function deleteNotificationResolver(parent, { id }, { currentUser }) {
  await authorizeNotificationUser(id, currentUser.id);
  await notificationService.deleteNotificationById(id);
  return true;
}
