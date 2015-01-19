module.exports = function(sequelize, DataTypes) {
  var Track = sequelize.define('Track', {
    name: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.Song, { through: 'SongTrack' });
      }
    }
  });
  return Track;
};