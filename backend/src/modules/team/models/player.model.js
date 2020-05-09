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

  Player.createPlayer = function (user, team) {
    return new Promise((resolve, reject) => {
      this.create({ userId: user.id, teamId: team.id })
        .then(resolve)
        .catch(reject);
    });
  };

  Player.associate = function (models) {
    models.player.belongsTo(models.user);
    models.player.belongsTo(models.team);
    models.player.getPlayerByUserAndGame = function (user, game) { // eslint-disable-line
      return new Promise((resolve, reject) => {
        models.player.findAll({
          where: {
            userId: user.id,
          },
          include: [
            {
              model: models.team,
              include: [
                {
                  model: models.game,
                  where: {
                    id: game.id,
                  },
                },
              ],
            },
          ],
        })
          .then(resolve)
          .catch(reject);
      });
    };
  };

  return Player;
}

export default initModel;