require("dotenv").config();

const app = require("./src/app.js");
const connectMongoDB = require("./src/config/mongo.js");

connectMongoDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log();
  console.log(`> Server listening on port ${port}`);
});
