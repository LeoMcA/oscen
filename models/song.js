module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.Track, { through: 'SongTrack' });
      }
    }
  });
  return Song;
};