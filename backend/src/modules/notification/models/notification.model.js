import {
  STATUS_NOTIFICATION_SEEN,
  STATUS_NOTIFICATION_SEEN_STORED,
  STATUS_NOTIFICATION_UNSEEN,
  STATUS_NOTIFICATION_UNSEEN_STORED,
} from '../constants';

function initModel(sequelize, DataTypes) {
  const Notification = sequelize.define('notification', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        STATUS_NOTIFICATION_SEEN_STORED,
        STATUS_NOTIFICATION_UNSEEN_STORED,
      ],
      allowNull: false,
      defaultValue: STATUS_NOTIFICATION_UNSEEN_STORED,
      get() {
        const status = this.getDataValue('status');
        if (status === STATUS_NOTIFICATION_SEEN_STORED) {
          return STATUS_NOTIFICATION_SEEN;
        }
        if (status === STATUS_NOTIFICATION_UNSEEN_STORED) {
          return STATUS_NOTIFICATION_UNSEEN;
        }
      },
      set(value) {
        if (value === STATUS_NOTIFICATION_SEEN) {
          return this.setDataValue('status', STATUS_NOTIFICATION_SEEN_STORED);
        }
        if (value === STATUS_NOTIFICATION_UNSEEN) {
          return this.setDataValue('status', STATUS_NOTIFICATION_UNSEEN_STORED);
        }
      },
    },
  });

  Notification.findById = function (id) {
    const condition = { where: { id } };
    return this.findOne(condition);
  };

  Notification.findByUserId = function (userId) {
    const condition = { where: { userId } };
    return this.findAll(condition);
  };

  Notification.associate = function (models) {
    models.notification.belongsTo(models.user, { onDelete: 'RESTRICT' });
  };

  return Notification;
}

export default initModel;
