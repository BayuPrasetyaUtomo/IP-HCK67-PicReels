'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tweet.belongsTo(models.User, { foreignKey: "UserId" })
      Tweet.hasOne(models.Image, { foreignKey: "TweetId" })
    }
  }
  Tweet.init({
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Emoji cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Emoji cannot be empty"
        },
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Title cannot be empty"
        },
      }
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Caption cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Caption cannot be empty"
        },
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "User cannot be empty"
        },
        notNull: {
          args: true,
          msg: "User cannot be empty"
        },
      }
    },

  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};