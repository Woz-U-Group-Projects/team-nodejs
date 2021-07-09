'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  topic.init({
    topicId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    sequelize,
    paranoid: true,
    modelName: 'topic',
  });
  return topic;
};