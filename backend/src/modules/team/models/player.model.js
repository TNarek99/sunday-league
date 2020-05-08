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

  return Player;
}

export default initModel;
