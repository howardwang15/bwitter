/* eslint-disable import/no-unresolved */
const Sequelize = require('sequelize');
const { userSchema, bweetSchema } = require('./schemas');

const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
  },
);

const User = userSchema(Sequelize, db);
const Bweet = bweetSchema(Sequelize, db);
User.hasMany(Bweet, { sourceKey: 'id', foreignKey: 'userId' });

if (process.env.NODE_ENV === 'development') {
  db.sync({ force: true }).then(async () => {
    const user1 = await User.create({
      firstName: 'Howard',
      lastName: 'Wang',
      email: 'example@gmail.com',
      handle: 'howardwang',
      password: '',
    });

    const user1Id = user1.dataValues.id;
    await Promise.all([
      User.create({
        firstName: 'Howie',
        lastName: 'Wang',
        email: 'example@outlook.com',
        handle: 'howardwang15',
        password: '',
      }),
      Bweet.create({
        likes: 4,
        text: 'Go Bruins!',
        userId: user1Id,
      }),
    ]);
  });
}

module.exports = {
  db,
  User,
  Bweet,
};
