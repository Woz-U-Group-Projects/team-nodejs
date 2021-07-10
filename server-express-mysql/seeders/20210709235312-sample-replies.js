'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('replies', [
      {
        replyId: 1,
        topicId: 1,
        userId: 1,
        level: 1,
        body: "I am having issues with React Hooks. Why won't they work?"
      },
      {
        replyId: 2,
        topicId: 1,
        userId: 3,
        level: 2,
        body: "Did you read the docs? https://reactjs.org/docs/hooks-intro.html"
      },
      {
        replyId: 3,
        topicId: 2,
        userId: 1,
        level: 1,
        body: "Angular is my favorite front-end platform"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('replies', null, {});
  }
};
