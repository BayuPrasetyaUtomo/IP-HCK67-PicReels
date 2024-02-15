'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Tweet, { foreignKey: "UserId" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Username cannot be empty"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email already existed"
      },
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        },
        isEmail: {
          args: true,
          msg: "Email format invalid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        },
        isMoreThanFiveCharacters(value) {
          if (value.length < 5) {
            throw new Error('Password needs to be more than 5 characters');
          }
        }
      }
    },
    subscription: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};