const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("> Database connected successfully!");
    console.log();
  })
  .catch((err) => {
    console.error("> Database connection error: ", err);
    console.log();
  });

module.exports = sequelize;
