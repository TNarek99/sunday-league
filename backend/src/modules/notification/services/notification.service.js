import models from '../../../database';
import NotFoundError from '../../../common/NotFoundError';
import { MESSAGE_NOTIFICATION_NOT_FOUND } from '../constants';

class NotificationService {
  async createNotification(notificationData) {
    return models.notification.create(notificationData);
  }

  async createNotifications(notificationsData) {
    return models.notification.bulkCreate(notificationsData);
  }

  async getNotificationsByUserId(userId) {
    return models.notification.findByUserId(userId);
  }

  async updateNotificationStatusById(id, status) {
    const notification = await this.getNotificationById(id);
    return this.updateNotificationStatus(notification, status);
  }

  async deleteNotificationById(id) {
    const notification = await this.getNotificationById(id);
    return this.deleteNotification(notification);
  }

  async updateNotificationStatus(notification, status) {
    return notification.update({ status });
  }

  async deleteNotification(notification) {
    await notification.destroy();
  }

  async getNotificationById(id) {
    const notification = await models.notification.findById(id);
    if (!notification) {
      throw new NotFoundError(MESSAGE_NOTIFICATION_NOT_FOUND);
    }
    return notification;
  }
}

const notificationService = new NotificationService();
export default notificationService;
