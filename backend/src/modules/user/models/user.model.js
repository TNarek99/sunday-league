import db from '../../../database/db';

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
});

User.findOrCreateUserByFirebase = function (firebaseId, mobile) {
  return new Promise((resolve) => {
    this.findOrCreate({ firebaseId, mobile }).then((user) => resolve(user));
  });
};

User.sync({ force: true });

export default User;
