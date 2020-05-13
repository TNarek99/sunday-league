import notificationService from './notification.service';
import gameService from '../../game/services/game.service';
import teamService from '../../team/services/team.service';
import { generateGameMatchStatusUpdatedMessage, userToNotificationDataForMessage } from '../utils/notificationBuilder.utils';

class NotificationBuilderService {
  async createGameMatchStatusChangedNotifications(game) {
    const firstTeam = await gameService.getFirstTeam(game);
    const secondTeam = await gameService.getSecondTeam(game);
    const firstTeamPlayers = await teamService.getPlayers(firstTeam);
    const secondTeamPlayers = await teamService.getPlayers(secondTeam);
    const players = [...firstTeamPlayers, ...secondTeamPlayers];
    const message = generateGameMatchStatusUpdatedMessage(game);
    const notificationsData = players.map(userToNotificationDataForMessage(message));
    return notificationService.createNotifications(notificationsData);
  }

  async createGameDateChangedNotification() {}

  async createInvitationNotification() {}
}

const notificationBuilderService = new NotificationBuilderService();
export default notificationBuilderService;
