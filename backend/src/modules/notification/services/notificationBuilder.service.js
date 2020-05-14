import notificationService from './notification.service';
import gameService from '../../game/services/game.service';
import invitationService from '../../scheduler/services/invitation.service';
import {
  generateGameMatchStatusUpdatedMessage,
  userToNotificationDataForMessage,
  generateGameDateChangedMessage,
  generateInvitationMessage,
} from '../utils/notificationBuilder.utils';

class NotificationBuilderService {
  async createGameMatchStatusChangedNotifications(game) {
    const users = await gameService.getUsers(game);
    const message = generateGameMatchStatusUpdatedMessage(game);
    const notificationsData = users.map(userToNotificationDataForMessage(message));
    return notificationService.createNotifications(notificationsData);
  }

  async createGameDateChangedNotification(game) {
    const users = await gameService.getUsers(game);
    const message = generateGameDateChangedMessage(game);
    const notificationsData = users.map(userToNotificationDataForMessage(message));
    return notificationService.createNotifications(notificationsData);
  }

  async createInvitationNotification(invitation) {
    const user = await invitationService.getUser(invitation);
    const game = await invitationService.getGame(invitation);
    const message = generateInvitationMessage(game);
    const notificationData = userToNotificationDataForMessage(message)(user);
    return notificationService.createNotification(notificationData);
  }
}

const notificationBuilderService = new NotificationBuilderService();
export default notificationBuilderService;
