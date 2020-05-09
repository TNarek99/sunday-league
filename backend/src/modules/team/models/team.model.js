import Sequelize from 'sequelize';

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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Team.associate = function (models) {
    models.team.hasMany(models.game, { as: 'firstTeam', foreignKey: 'firstTeamId' });
    models.team.hasMany(models.game, { as: 'secondTeam', foreignKey: 'secondTeamId' });
    models.team.hasMany(models.player);

    Team.getPlayersCountById = function (id) {
      return new Promise((resolve, reject) => {
        this.findAll({
          where: {
            id,
          },
          attributes: [[Sequelize.fn('COUNT', Sequelize.col('players.id')), 'playerCount']],
          include: [
            {
              model: models.player,
              attributes: [],
            },
          ],
          group: ['team.id'],
        })
          .then((response) => resolve(response[0].dataValues.playerCount))
          .catch(reject);
      });
    };
  };

  return Team;
}

export default initModel;
