'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MoodImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ImageId:  {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Images',
          },
          key: 'id'
        },
        allowNull: false
      },
      MoodId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Moods',
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MoodImages');
  }
};