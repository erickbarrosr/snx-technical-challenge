const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define("Comment", {
  content: DataTypes.TEXT,
});

module.exports = Comment;
