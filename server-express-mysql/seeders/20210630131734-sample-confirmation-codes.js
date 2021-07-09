'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('confirmation_codes', [
      {
        codeId: 1,
        confirmationCode: 111111,
        createdAt: '2021-07-03 06:14:30',
        expiresAt: '2021-07-03 07:14:30'
      },
      {
        codeId: 2,
        confirmationCode: 222222,
        createdAt: '2021-07-03 06:14:30',
        expiresAt: '2021-07-03 07:14:30'
      },
      {
        codeId: 3,
        confirmationCode: 333333,
        createdAt: '2021-07-03 06:15:30',
        expiresAt: '2021-07-03 07:15:30'
      }
    ], {});
    await queryInterface.bulkUpdate('users', { codeId: 1 }, { id: 1 });
    await queryInterface.bulkUpdate('users', { codeId: 2 }, { id: 2 });
    await queryInterface.bulkUpdate('users', { codeId: 3 }, { id: 3 });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('confirmation_codes', null, {});
    await queryInterface.bulkUpdate('users', { codeId: null }, { id: 1 });
    await queryInterface.bulkUpdate('users', { codeId: null }, { id: 2 });
    await queryInterface.bulkUpdate('users', { codeId: null }, { id: 3 });
  }
};
