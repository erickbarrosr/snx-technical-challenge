const express = require("express");
const authRoutes = require("./authRoutes.js");
const commentRoutes = require("./commentRoutes.js");
const postRoutes = require("./postRoutes.js");

module.exports = (app) => {
  app.use(express.json(), authRoutes, commentRoutes, postRoutes);
};
