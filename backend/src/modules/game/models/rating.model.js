function initModel(sequelize, DataType) {
    const Rating = sequelize.define('rating', {
        rating: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataType.STRING,
            allowNull: true,
        }
    })

    Rating.createRating = function (rating, player, game) {
        return new Promise((resolve, reject) => {
            this.create({
                rating: rating.rating,
                description: rating.description,
                gameId: game.id,
                playerId: player.id
            })
            .then(resolve)
            .catch(reject)
        })
    }

    Rating.updateRating = function (ratingInstance, rating, player, game) {
        return new Promise((resolve, reject) => {
            ratingInstance.update({
                rating: rating.rating,
                description: rating.description,
                playerId: player.id,
                gameId: game.id
            })
            .then(resolve)
            .catch(reject)
        })
    }

    Rating.associate = function (models) {
        models.rating.belongsTo(models.game, { foreignKey: 'gameId'}),
        models.rating.belongsTo(models.player, { foreignKey: 'playerId'})
    }

    return Rating;
}

export default initModel;