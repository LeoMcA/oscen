"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(unhashed) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(unhashed, salt);
        return this.setDataValue('password', hash);
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.Song, { as: 'CreatedSongs', through: 'UserCreatedSongs' });
      }
    }
  });
  return User;
};