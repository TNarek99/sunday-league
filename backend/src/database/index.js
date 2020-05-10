
const path = require('path');
const Sequelize = require('sequelize');
const glob = require('glob');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, 'config.js'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

glob
  .sync(path.join(__dirname, '../modules/**/models/*.model.js'))
  .forEach((file) => {
    const model = sequelize.import(file);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ force: true });

module.exports = db;
