import db from '../../../database/db';
import {
  STATUS_ACTIVE, STATUS_CREATED, GENDER_FEMALE, GENDER_MALE,
} from '../constants';

const User = db.sequelize.define('user', {
  firstName: {
    type: db.Sequelize.STRING,
    defaultValue: 'name',
  },
  lastName: {
    type: db.Sequelize.STRING,
    defaultValue: 'surname',
  },
  mobile: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  firebaseId: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  status: {
    type: db.Sequelize.ENUM([STATUS_ACTIVE, STATUS_CREATED]),
    allowNull: false,
    defaultValue: STATUS_CREATED,
  },
  birthDate: {
    type: db.Sequelize.DATE,
  },
  gender: {
    type: db.Sequelize.ENUM([GENDER_FEMALE, GENDER_MALE]),
  },
  email: {
    type: db.Sequelize.STRING,
  },
  shirtNumber: {
    type: db.Sequelize.INTEGER,
  },
});

User.findOrCreateByFirebase = function (firebaseId, mobile) {
  return new Promise((resolve, reject) => {
    this.findOrCreate({ firebaseId, mobile })
      .then(resolve)
      .catch(reject);
  });
};

User.findByFirebaseId = function (firebaseId) {
  const condition = { where: { firebaseId } };
  return new Promise((resolve, reject) => {
    this.find(condition)
      .then(resolve)
      .catch(reject);
  });
};

User.updateByFirebaseId = function (firebaseId, userData) {
  const condition = {
    where: { firebaseId },
  };
  return new Promise((resolve, reject) => {
    this.update(userData, condition)
      .then(resolve)
      .catch(reject);
  });
};

User.sync({ force: true });

export default User;
