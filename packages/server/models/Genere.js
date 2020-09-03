const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Genere = db.define("Genere", {
  genere: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

// Genere.sync()

module.exports = Genere;
