'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('confirmation_codes', [
      {
        code_id: 1,
        confirmation_code: 111111,
        created_at: '2021-07-03 06:14:30',
        expires_at: '2021-07-03 07:14:30'
      },
      {
        code_id: 2,
        confirmation_code: 222222,
        created_at: '2021-07-03 06:14:30',
        expires_at: '2021-07-03 07:14:30'
      },
      {
        code_id: 3,
        confirmation_code: 333333,
        created_at: '2021-07-03 06:15:30',
        expires_at: '2021-07-03 07:15:30'
      }
    ], {});
    await queryInterface.bulkUpdate('users', { code_id: 1 }, { id: 1 });
    await queryInterface.bulkUpdate('users', { code_id: 2 }, { id: 2 });
    await queryInterface.bulkUpdate('users', { code_id: 3 }, { id: 3 });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('confirmation_codes', null, {});
    await queryInterface.bulkUpdate('users', { code_id: null }, { id: 1 });
    await queryInterface.bulkUpdate('users', { code_id: null }, { id: 2 });
    await queryInterface.bulkUpdate('users', { code_id: null }, { id: 3 });
  }
};
