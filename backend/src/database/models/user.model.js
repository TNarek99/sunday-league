import db from '../db';

const User = db.sequelize.define('user', {
  firstName: {
    type: db.Sequelize.STRING,
  },
  lastName: {
    type: db.Sequelize.STRING,
  },
});

User.sync({ force: true });

export default User;
