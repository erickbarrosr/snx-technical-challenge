const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    name: DataTypes.STRING,
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  },
  {
    tableName: "users",
  }
);

module.exports = User;
