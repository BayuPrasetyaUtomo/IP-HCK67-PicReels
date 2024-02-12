'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const moods = require("../seeds/mood.json").map(mood => {
      mood.createdAt = mood.updatedAt = new Date()
      return mood
    })
    console.log(moods);
    await queryInterface.bulkInsert('Moods', moods);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Moods');
  }
};
