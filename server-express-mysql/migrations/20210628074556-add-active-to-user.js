'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users', 
      'active',
      {
        allowNull:false,
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal('0')
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'active');
  }
};
