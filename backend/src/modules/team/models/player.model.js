function initModel(sequelize, DataTypes) {
  const Player = sequelize.define('player', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return String(this.getDataValue('id'));
      },
    },
  });

  Player.associate = function (models) {
    models.player.belongsTo(models.team);
    models.player.belongsTo(models.user);
  };

  return Player;
}

export default initModel;
