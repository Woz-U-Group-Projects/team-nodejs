'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('replies', {
      replyId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      topicId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      level: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 1
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        allowNull:" true",
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('replies');
  }
};
