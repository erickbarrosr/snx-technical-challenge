const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define(
  "Comment",
  {
    content: DataTypes.TEXT,
    postId: DataTypes.STRING,
  },
  {
    tableName: "comments",
  }
);

module.exports = Comment;
