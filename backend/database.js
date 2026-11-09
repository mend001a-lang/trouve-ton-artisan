
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,

    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(
          path.join(__dirname, "isrgrootx1.pem"),
          "utf8"
        ),
        rejectUnauthorized: true
      }
    }
  }
);

module.exports = sequelize;
