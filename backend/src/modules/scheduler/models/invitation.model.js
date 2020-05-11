function initModel(sequelize, DataTypes) {
  const Invitation = sequelize.define('invitation', {
  });

  Invitation.createInvitation = function (user, game) {
    return this.create({ userId: user.id, gameId: game.id });
  };

  Invitation.associate = function (models) {
    models.invitation.belongsTo(models.user);
    models.invitation.belongsTo(models.game);
  };

  return Invitation;
}

export default initModel;
