const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Categorie = sequelize.define("Categorie", {
  id_categorie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nom_categorie: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }

}, {
  tableName: "categorie",
  timestamps: false
});

module.exports = Categorie;