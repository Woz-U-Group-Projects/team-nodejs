'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasOne(models.confirmation_code, { foreignKey: 'codeId' });
      models.user.hasMany(models.topic, { foreignKey: 'userId' });
    }
  };
  user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codeId: {
      allowNull: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    active: {
      allowNull:false,
      type: DataTypes.BOOLEAN,
      defaultValue: sequelize.literal('0')
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};