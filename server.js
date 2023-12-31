const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3001 } = process.env;

(async () => {
  await mongoose
    .connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log("Database connection successful");
        console.log(`Server running. Use our API on port: ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(`Server not running. Error message: ${err.message}`);
      process.exit(1);
    });
})();

mongoose.set("strictQuery", true);
