const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Sync DB and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.DB_PORT, () => {
      console.log(`Server running on port ${process.env.DB_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
