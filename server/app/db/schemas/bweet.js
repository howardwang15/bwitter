module.exports = function (Sequelize, db) {
  const Bweet = db.define('bweets', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:
      Sequelize.UUIDV4,
    },
    likes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    text: { type: Sequelize.STRING, allowNull: false },
    userId: { type: Sequelize.UUID, allowNull: false },
  });

  Bweet.findById = function (id) {
    return this.find(id);
  };

  return Bweet;
};
