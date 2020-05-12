import {
  STATUS_INVITATION_ACCEPTED,
  STATUS_INVITATION_ACCEPTED_STORED,
  STATUS_INVITATION_PENDING,
  STATUS_INVITATION_PENDING_STORED,
  STATUS_INVITATION_REJECTED,
  STATUS_INVITATION_REJECTED_STORED,
} from '../constants';

function initModel(sequelize, DataTypes) {
  const Invitation = sequelize.define('invitation', {
    status: {
      type: DataTypes.ENUM,
      values: [
        STATUS_INVITATION_ACCEPTED_STORED,
        STATUS_INVITATION_PENDING_STORED,
        STATUS_INVITATION_REJECTED_STORED],
      allowNull: false,
      defaultValue: STATUS_INVITATION_PENDING_STORED,
      get() {
        const status = this.getDataValue('status');
        if (status === STATUS_INVITATION_PENDING_STORED) {
          return STATUS_INVITATION_PENDING;
        }
        if (status === STATUS_INVITATION_ACCEPTED_STORED) {
          return STATUS_INVITATION_ACCEPTED;
        }
        if (status === STATUS_INVITATION_REJECTED_STORED) {
          return STATUS_INVITATION_REJECTED;
        }
      },
      set(value) {
        if (value === STATUS_INVITATION_PENDING) {
          this.setDataValue('status', STATUS_INVITATION_PENDING_STORED);
        }
        if (value === STATUS_INVITATION_ACCEPTED) {
          this.setDataValue('status', STATUS_INVITATION_ACCEPTED_STORED);
        }
        if (value === STATUS_INVITATION_REJECTED) {
          this.setDataValue('status', STATUS_INVITATION_REJECTED_STORED);
        }
      },
    },
  });

  Invitation.createInvitation = function (user, game) {
    return this.create({ userId: user.id, gameId: game.id });
  };

  Invitation.findById = function (id) {
    const condition = { where: { id } };
    return this.findOne(condition);
  };

  Invitation.associate = function (models) {
    models.invitation.belongsTo(models.user);
    models.invitation.belongsTo(models.game);
  };

  return Invitation;
}

export default initModel;
