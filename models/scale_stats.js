'use strict';
module.exports = function(sequelize, DataTypes) {
  var Scale_stats = sequelize.define('Scale_stats', {
    on_event_count: DataTypes.BOOLEAN,
    off_event_count: DataTypes.BOOLEAN,
    low_event_count: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Scale_stats.belongsTo(models.Scale);
      }
    }
  });
  return Scale_stats;
};
