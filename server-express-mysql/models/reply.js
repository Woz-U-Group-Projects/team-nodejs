'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    static associate(models) {
      models.reply.belongsTo(models.topic, { foreignKey: 'topicId' });
      models.reply.belongsTo(models.user, { foreignKey: 'userId' });
    }
  };
  reply.init({
    replyId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    topicId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    parentId: {
      allowNull: true,
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: null
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null
    }
  }, {
    name: {
      singular: 'reply',
      plural: 'replies'
    },
    sequelize,
    paranoid: true,
    modelName: 'reply',
  });
  return reply;
};