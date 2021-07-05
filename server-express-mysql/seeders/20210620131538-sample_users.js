'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'person@gmail.com',
        password: 'password1',
        active: true
      },
      {
        email: 'anotherperson@gmail.com',
        password: 'password2',
        active: false
      },
      {
        email: 'pjharris1016@gmail.com',
        password: 'ham30',
        active: true

      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
