const sequelize = require("../config/database");
const User = require("./user.js");
const Post = require("./post.js");
const Comment = require("./comments.js");

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = { sequelize, User, Post, Comment };
