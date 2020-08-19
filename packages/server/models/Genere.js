const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Genere = db.define("Genere", {
  genere: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Genere;
