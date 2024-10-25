const Task = require("../model/task.js");

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      userId: req.user.id, // Link to logged-in user
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, dueDate } = req.body;

  try {
    const taskId = parseInt(id, 10);

    // Search for the task based on id and userId
    const task = await Task.findOne({
      where: { id: taskId, userId: req.user.id },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update({ title, description, priority, status, dueDate });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
