'use strict';
module.exports = (sequelize, DataTypes) => {
  const Frame = sequelize.define('Frame', {
    name: DataTypes.STRING
  }, {});
  Frame.associate = function(models) {
    // associations can be defined here
  };
  return Frame;
};