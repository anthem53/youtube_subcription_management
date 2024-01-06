const Sequelize = require('sequelize');
const {printd} = require('lee-simple-log')
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            accessToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            refreshToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            subsUpdateAt: {
                type: Sequelize.DATE,
            },
            inactiveTime:{
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

  static associate(db) {
    db.User.hasMany(db.Channel, {foreignKey:'userId',sourceKey:'id'})
  }
};
