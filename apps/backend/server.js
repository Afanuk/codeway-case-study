const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./users");

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Users routes
app.use("/users", usersRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
