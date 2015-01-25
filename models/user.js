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
      },
      adminList: function() {
        return ['Email'];
      },
      adminAdd: function() {
        return [
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
        ]
      }
    },
    instanceMethods: {
      adminList: function() {
        return [
          this.getDataValue('email')
        ];
      },
      adminView: function() {
        return [
          { name: 'email', value: this.getDataValue('email') }
        ];
      },
      adminEdit: function() {
        return [
          { label: 'Email', name: 'email', type: 'email', value: this.getDataValue('email') },
          { label: 'Password', name: 'password', type: 'password', value: '' }
        ]
      }
    }
  });
  return User;
};