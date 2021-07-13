'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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