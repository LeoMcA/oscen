module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.User, { as: 'Creator', through: 'UserCreatedSongs' });
        this.belongsToMany(models.Track, { through: 'SongTrack' });
      },
      adminList: function() {
        return ['Name'];
      }
    },
    instanceMethods: {
      adminList: function(){
        return [
          this.getDataValue('name')
        ];
      }
    }
  });
  return Song;
};