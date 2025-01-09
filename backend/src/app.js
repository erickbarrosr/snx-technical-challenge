const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

routes(app);

module.exports = app;
