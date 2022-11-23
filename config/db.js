"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "myspa_checkin",
  process.env.DB_USER || process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    operatorsAliases: false,
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
