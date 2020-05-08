function initModel(sequelize, DataTypes) {
  const Team = sequelize.define('team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return String(this.getDataValue('id'));
      },
    },
  });

  Team.associate = function (models) {
    models.team.hasMany(models.player);
    models.team.hasMany(models.game, { as: 'firstTeam', foreignKey: 'firstTeamId' });
    models.team.hasMany(models.game, { as: 'secondTeam', foreignKey: 'secondTeamId' });
  };

  return Team;
}

export default initModel;
