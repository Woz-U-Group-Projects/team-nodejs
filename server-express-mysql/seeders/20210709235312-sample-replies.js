'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('replies', [
      {
        replyId: 1,
        topicId: 1,
        userId: 1,
        parentId: null,
        body: "I am having issues with React Hooks. Why won't they work?"
      },
      {
        replyId: 2,
        topicId: 1,
        userId: 3,
        parentId: 1,
        body: "Did you read the docs? https://reactjs.org/docs/hooks-intro.html"
      },
      {
        replyId: 3,
        topicId: 2,
        userId: 1,
        parentId: null,
        body: "Angular is my favorite front-end platform"
      },
      {
        replyId: 4,
        topicId: 1,
        userId: 1,
        parentId: 2,
        body: "I did read the docs but I did not understand how the hooks are implemented between functional components"
      },
      {
        replyId: 5,
        topicId: 3,
        userId: 4,
        parentId: null,
        body: "Vue is my favorite view library. It's so simple to learn and implement."
      },
      {
        replyId: 6,
        topicId: 1,
        userId: 3,
        parentId: 4,
        body: "Well, I read the docs and understood them somewhat.I just don't know how to implement useEffect()"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('replies', null, {});
  }
};
