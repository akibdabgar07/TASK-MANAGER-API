const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },
  status: {
    type: DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
  },
  dueDate: {
    type: DataTypes.DATE,
  },
});

// Associate task with user
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = Task;
