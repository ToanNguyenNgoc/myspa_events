"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB || "myspa_checkin",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASS || "",
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    operatorsAliases: false,
    port: process.env.PORT || "3306",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("../modals/customers")(sequelize, Sequelize, DataTypes);

module.exports = db;
