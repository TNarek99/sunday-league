import {
  TYPE_CLOSED,
  TYPE_CLOSED_STORED,
  TYPE_OPEN,
  TYPE_OPEN_STORED,
  TYPE_PRIVATE,
  TYPE_PRIVATE_STORED,
  STATUS_FINISHED,
  STATUS_FINISHED_STORED,
  STATUS_PENDING,
  STATUS_PENDING_STORED,
  STATUS_STARTED,
  STATUS_STARTED_STORED,
} from '../constants/game.constants';

function initModel(sequelize, DataTypes) {
  const Game = sequelize.define('game', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: [TYPE_CLOSED_STORED, TYPE_PRIVATE_STORED, TYPE_OPEN_STORED],
      allowNull: false,
      defaultValue: TYPE_OPEN_STORED,
      set(value) {
        if (value === TYPE_OPEN) {
          return this.setDataValue('type', TYPE_OPEN_STORED);
        }
        if (value === TYPE_CLOSED) {
          return this.setDataValue('type', TYPE_CLOSED_STORED);
        }
        if (value === TYPE_PRIVATE) {
          return this.setDataValue('type', TYPE_PRIVATE_STORED);
        }
      },
      get() {
        const type = this.getDataValue('type');
        if (type === TYPE_OPEN_STORED) {
          return TYPE_OPEN;
        }
        if (type === TYPE_CLOSED_STORED) {
          return TYPE_CLOSED;
        }
        if (type === TYPE_PRIVATE_STORED) {
          return TYPE_PRIVATE;
        }
      },
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    matchStatus: {
      type: DataTypes.ENUM,
      values: [
        STATUS_FINISHED,
        STATUS_FINISHED_STORED,
        STATUS_PENDING,
        STATUS_PENDING_STORED,
        STATUS_STARTED,
        STATUS_STARTED_STORED,
      ],
      defaultValue: STATUS_PENDING_STORED,
      set(value) {
        if (value === STATUS_FINISHED) {
          return this.setDataValue('status', STATUS_FINISHED_STORED);
        }
        if (value === STATUS_PENDING) {
          return this.setDataValue('status', STATUS_PENDING_STORED);
        }
        if (value === STATUS_STARTED) {
          return this.setDataValue('status', STATUS_STARTED_STORED);
        }
      },
      get() {
        const status = this.getDataValue('status');
        if (status === STATUS_FINISHED_STORED) {
          return STATUS_FINISHED;
        }
        if (status === STATUS_PENDING_STORED) {
          return STATUS_PENDING;
        }
        if (status === STATUS_STARTED_STORED) {
          return STATUS_STARTED;
        }
      },
    },
  });

  Game.associate = function (models) {
    models.game.belongsTo(models.user, { foreignKey: 'userId' });
  };

  return Game;
}

export default initModel;