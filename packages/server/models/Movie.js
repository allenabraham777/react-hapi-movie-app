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
      allowNull: false,
      unique: true
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
  }
);

// Movie.sync()

module.exports = Movie