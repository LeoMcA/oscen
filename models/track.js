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
        return ['Name'];
      },
      adminAdd: function() {
        return [
          { label: 'Name', name: 'name', type: 'text' }
        ]
      }
    },
    instanceMethods: {
      adminList: function(){
        return [
          this.getDataValue('name')
        ];
      },
      adminInstance: function() {
        return [
          { name: 'name', value: this.getDataValue('name') }
        ];
      }
    }
  });
  return Track;
};