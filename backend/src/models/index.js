const sequelize = require("../config/database");
const User = require("./user.js");
const Post = require("./post.js");
const Comment = require("./comments.js");

User.hasMany(Post, { foreignKey: { name: "userId", field: "userId" } });
Post.belongsTo(User, { foreignKey: { name: "userId", field: "userId" } });

Post.hasMany(Comment, { foreignKey: { name: "postId", field: "postId" } });
Comment.belongsTo(Post, { foreignKey: { name: "postId", field: "postId" } });

module.exports = { sequelize, User, Post, Comment };
