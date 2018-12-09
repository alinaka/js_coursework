'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Frames', [{
        name: '2.jpg',
        movie_id: 2
      }, {
        name: '6.jpg',
        movie_id: 7
      }, {
        name: '7.jpg',
        movie_id: 12
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Frames', null, {});
  }
};
