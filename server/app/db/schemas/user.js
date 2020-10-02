const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = (Sequelize, db) => {
  const User = db.define('users', {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    handle: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    picture: { type: Sequelize.STRING, allowNull: true },
  });

  User.addExtras = function (models) {
    User.hasMany(models.Bweet, { sourceKey: 'id', foreignKey: 'userId' });

    User.findById = function (id) {
      return this.findByPk(id);
    };

    User.findByHandle = function (handle) {
      return this.findOne({ where: { handle } });
    };

    User.register = async function (user) {
      const existing = await this.findOne({
        where: {
          [Op.or]: [
            { email: user.email },
            { handle: user.handle },
          ],
        },
      });

      if (existing !== null) {
        throw new Error('User with email or handle already exists!');
      }
      return new Promise(async (resolve, reject) => {
        bcrypt.hash(user.password, 10, async (err, hash) => {
          if (err) {
            reject(err);
          }
          user.password = hash;
          const addedUser = await User.create(user);
          resolve(addedUser);
        });
      });
    };

    User.login = async function (user) {
      const foundUser = await this.findOne({ where: { email: user.email } });
      if (!foundUser) {
        throw new Error('Email not found');
      }

      const foundHash = foundUser.getDataValue('password');
      return new Promise((resolve, reject) => {
        bcrypt.compare(user.password, foundHash, (err, result) => {
          if (err) {
            return reject(err);
          }
          if (!result) {
            return reject('Incorrect password');
          }
          resolve(foundUser);
        });
      });
    };

    User.logout = async function () {
      return new Promise((resolve) => {
        resolve(true);
      });
    };

    User.prototype.getPublicProfile = function () {
      const publicProfile = {
        id: this.getDataValue('id'),
        firstName: this.getDataValue('firstName'),
        lastName: this.getDataValue('lastName'),
        email: this.getDataValue('email'),
        handle: this.getDataValue('handle'),
        picture: this.getDataValue('picture'),
      };
      return publicProfile;
    };

    User.prototype.createToken = function () {
      const publicProfile = this.getPublicProfile();
      return new Promise((resolve, reject) => {
        jwt.sign(
          publicProfile,
          process.env.APP_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              reject(`Error when creating token: ${err}`);
            } else {
              resolve(token);
            }
          },
        );
      });
    };
  };

  return User;
};
