'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('topics', [
      {
        userId: 1,
        heading: "React",
        body: "This is a forum for the React Development community"
      },
      {
        userId: 1,
        heading: "Angular",
        body: "This is a forum for the Angular Development community"
      },
      {
        userId: 1,
        heading: "Vue",
        body: "This is a forum for the Vue Development community"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('topics', null, {});
  }
};
