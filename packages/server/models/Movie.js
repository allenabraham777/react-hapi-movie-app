const {DataTypes} = require("sequelize");
const db = require("../config/database");

const Movie = db.define(
  "Movie",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genere: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
  }
);

module.exports = Movie