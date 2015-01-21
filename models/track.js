module.exports = function(sequelize, DataTypes) {
  var Track = sequelize.define('Track', {
    name: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.Song, { through: 'SongTrack' });
      },
      adminList: function() {
        return ['#', 'Name'];
      }
    },
    instanceMethods: {
      adminList: function(){
        return [
          this.getDataValue('id'),
          this.getDataValue('name')
        ];
      }
    }
  });
  return Track;
};