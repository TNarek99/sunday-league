function initModel(sequelize, DataType) {
  const Rating = sequelize.define('rating', {
    rating: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataType.STRING,
      allowNull: true,
    },
  });

  Rating.findById = function (id) {
    const condition = { where: { id } };
    return this.findOne(condition);
  };

  Rating.findRatingByGameAndPlayer = function (game, player) {
    const condition = { gameId: game.id, playerId: player.id };
    return this.findOne(condition);
  };

  Rating.createRating = function (ratingData, player, game) {
    return new Promise((resolve, reject) => {
      this.create({
        rating: ratingData.rating,
        description: ratingData.description,
        gameId: game.id,
        playerId: player.id,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  Rating.associate = function (models) {
    models.rating.belongsTo(models.game);
    models.rating.belongsTo(models.player);
  };

  return Rating;
}

export default initModel;
