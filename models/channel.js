/*
    title: String,
    channelId: String
    description: String
    publishedAt: DATE
    videoId: String
    videoTitle: String

*/

const Sequelize = require('sequelize');
const {printd} = require('lee-simple-log')
module.exports = class Channel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            channelId: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            publishedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            videoId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            videoTitle: {
                type: Sequelize.STRING(50       ),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Channel',
            tableName: 'channels',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

  static associate(db) {
    db.Channel.belongsTo(db.User, {
        as:'users',
        onDelete: 'cascade',
    })
  }
};
