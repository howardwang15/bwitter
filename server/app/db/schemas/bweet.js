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

  Bweet.addExtras = function (models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });

    Bweet.findById = function (id) {
      return this.findOne(id);
    };

    Bweet.findByUserHandle = function (handle) {
      return this.findAll({
        include: [
          {
            model: models.User,
            required: true,
            where: {
              handle,
            },
            attributes: ['firstName', 'lastName', 'handle', 'picture'],
          },
        ],
        attributes: ['id', 'likes', 'text', 'userId'],
      });
    };

    Bweet.add = function (document) {
      return this.create(document);
    };

    Bweet.delete = function (id) {
      return this.destroy({
        where: { id },
      });
    };
  };

  return Bweet;
};
