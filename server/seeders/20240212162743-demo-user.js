'use strict';
const { hashPassword } = require('../helpers/bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../seeds/user.json").map(user => {
      user.password = hashPassword(user.password)
      user.createdAt = user.updatedAt = new Date()
      return user
    })
    console.log(users);
    await queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users')
  }
};
