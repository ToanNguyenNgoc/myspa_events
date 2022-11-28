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
    dialectOptions: {
      charset: "utf8mb4",
      collate: "utf8mb4_vietnamese_ci",
    },
    port: process.MYSQL_PORT || "3306",
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

db.role = require("../modals/role")(sequelize, Sequelize, DataTypes);
db.user = require("../modals/user")(sequelize, Sequelize, DataTypes);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["admin", "user"];

module.exports = db;
