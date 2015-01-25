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
      adminView: function() {
        return [
          { name: 'name', value: this.getDataValue('name') }
        ];
      },
      adminEdit: function() {
        return [
          { label: 'Name', name: 'name', type: 'text', value: this.getDataValue('name') }
        ]
      }
    }
  });
  return Song;
};