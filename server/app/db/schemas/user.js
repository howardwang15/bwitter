 module.exports = (Sequelize, db) => {
  const User = db.define('users', {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    handle: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    picture: { type: Sequelize.STRING, allowNull: true }
  });


  User.findById = function(id) {
    return this.find(id);    
  }

  User.findByHandle = function(handle) {
    return this.find({ where: { handle }});
  }

  return User;
}
