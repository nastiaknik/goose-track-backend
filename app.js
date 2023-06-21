const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const authRouter = require("./routes/api/authRouter");
const userRouter = require("./routes/api/userRouter");
const taskRouter = require("./routes/api/taskRouter");
const reviewRouter = require("./routes/api/reviewRouter");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
// app.use("/api/tasks", taskRouter);
// app.use("/api/reviews", reviewRouter);

app.use((req, res) => {
  res.status(404).json({
    message:
      "Use api on routes: /api/auth, /api/users, /api/tasks or /api/reviews",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
