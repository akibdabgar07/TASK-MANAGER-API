const TaskModel = require("../model/task");

exports.creteTaskService = (task) => {
  return TaskModel.create(task);
};
