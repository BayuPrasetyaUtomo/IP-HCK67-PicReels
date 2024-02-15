'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Tweet, { foreignKey: "TweetId" })
    }
  }
  Image.init({
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Image cannot be empty"
        },
      }
    },
    TweetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Mood is required"
        },
        notNull: {
          args: true,
          msg: "Mood is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};