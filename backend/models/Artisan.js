
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Artisan = sequelize.define("Artisan", {
  id_artisan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nom: {
    type: DataTypes.STRING(150),
    allowNull: false
  },

  note: {
    type: DataTypes.DECIMAL(2, 1)
  },

  ville: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  a_propos: {
    type: DataTypes.TEXT
  },

  email: {
    type: DataTypes.STRING(150),
    allowNull: false
  },

  site_web: {
    type: DataTypes.STRING(255)
  },

  top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  id_specialite: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: "artisan",
  timestamps: false
});

module.exports = Artisan;
