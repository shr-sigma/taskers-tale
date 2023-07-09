const tasksService = require('../services/tasksService');

// Controller method to get all tasks
const getAllTasks = async (req, res) => {
  try {
    const filters = {};
    const sortOrder = [];
    let include = false

    for (const key in req.query) {
      if (key === 'sortBy' || key === 'orderBy') {
        sortOrder.push(req.query[key]);
      } else if (key === 'include') {
        include = req.query.include;
      } else {
        filters[key] = req.query[key];
      }
    }

    const tasks = await tasksService.getAllTasks(filters, sortOrder, include);
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

const getAllTaskNames = async (req, res) => {
  try {
   const tasks = await tasksService.getAllTaskNames();
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const tasks = await tasksService.getTaskById(
      req.params.id,
      req.query.fetchSubtasks,
      req.query.fetchlogs
    );
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

const getTaskByName = async (req, res) => {
  try {
    const tasks = await tasksService.getTaskByName(
      req.params.name,
      req.query.fetchSubtasks,
      req.query.fetchlogs
    );
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
  getAllTaskNames,
  getTaskById,
  getTaskByName,
  createTask,
  updateTask,
  deleteTask
};
