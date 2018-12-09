'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    internationalTitle: DataTypes.STRING,
    year: DataTypes.SMALLINT
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};