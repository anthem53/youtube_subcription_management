const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Channel = require('./channel')

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Channel = Channel;

User.init(sequelize);
Channel.init(sequelize);

User.associate(db);
Channel.associate(db);

module.exports = db;
