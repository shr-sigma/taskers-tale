const tasksService = require('../services/tasksService');

// Controller method to get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksService.getAllTasks({
      sortBy: req.query.sortBy,
      orderBy: req.query.orderBy
    });
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

// Controller method to create a new task
const createTask = async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await tasksService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

// Controller method to update a task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const updatedTask = await tasksService.updateTaskMetaData(taskId, taskData);
    res.json(updatedTask);
  } catch (error) {
    console.log(error)
    res.status( error.status).json({ error:  error.message });
  }
};

// Controller method to delete a task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await tasksService.deleteTask(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status( error.status).json({ error:  error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
