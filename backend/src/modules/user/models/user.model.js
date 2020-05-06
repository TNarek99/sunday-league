import db from '../../../database/db';
import {
  STATUS_ACTIVE,
  STATUS_CREATED,
  GENDER_FEMALE,
  GENDER_MALE,
  STATUS_CREATED_STORED,
  STATUS_ACTIVE_STORED,
  GENDER_MALE_STORED,
  GENDER_FEMALE_STORED,
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
    type: db.Sequelize.ENUM,
    values: [STATUS_ACTIVE_STORED, STATUS_CREATED_STORED],
    allowNull: false,
    defaultValue: STATUS_CREATED_STORED,
    set(value) {
      if (value === STATUS_CREATED) {
        return this.setDataValue('status', STATUS_CREATED_STORED);
      }
      return this.setDataValue('status', STATUS_ACTIVE_STORED);
    },
    get() {
      if (this.getDataValue('status') === STATUS_CREATED_STORED) {
        return STATUS_CREATED;
      }
      return STATUS_ACTIVE;
    },
  },
  birthDate: {
    type: db.Sequelize.DATE,
  },
  gender: {
    type: db.Sequelize.ENUM,
    values: [GENDER_FEMALE_STORED, GENDER_MALE_STORED],
    set(value) {
      if (value === GENDER_MALE) {
        return this.setDataValue('gender', GENDER_MALE_STORED);
      }
      if (value === GENDER_FEMALE) {
        return this.setDataValue('gender', GENDER_FEMALE_STORED);
      }
    },
    get() {
      if (this.getDataValue('gender') === GENDER_MALE_STORED) {
        return GENDER_MALE;
      }
      if (this.getDataValue('gender') === GENDER_FEMALE_STORED) {
        return GENDER_FEMALE;
      }
    },
  },
  email: {
    type: db.Sequelize.STRING,
  },
  shirtNumber: {
    type: db.Sequelize.INTEGER,
  },
});

User.findOrCreateByFirebase = function (firebaseId, mobile) {
  const condition = { where: { firebaseId, mobile } };
  return new Promise((resolve, reject) => {
    this.findOrCreate(condition)
      .then((response) => resolve(response[0]))
      .catch(reject);
  });
};

User.findByFirebaseId = function (firebaseId) {
  const condition = { where: { firebaseId } };
  return new Promise((resolve, reject) => {
    this.findOne(condition)
      .then(resolve)
      .catch(reject);
  });
};

User.sync({ force: true });

export default User;
