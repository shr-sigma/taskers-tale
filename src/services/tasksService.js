const task = require('../repository/task'); // Assuming you have a Task model

// Service method to get all tasks
const getAllTasks = async (filter = {}, sortOrder = [], include) => {
  try {
    const order = sortOrder.length ? [sortOrder] : [['priority', 'ASC']]

    return await task.getAllTasks({where: filter}, order, include);
  } catch (error) {
    console.log(error)
    error.status = 400
    error.message = error.message
    throw error;
  }
};

const getAllTaskNames = async () => {
  try {
    const order = [['priority', 'ASC']]

    return await task.getAllTaskNames();
  } catch (error) {
    console.log(error)
    error.status = 400
    error.message = error.message
    throw error;
  }
};

const getTaskById = async (taskId, fetchSubtasks, fetchLogs) => {
  try {
    const tasks = await task.getTaskById(taskId, fetchSubtasks, fetchLogs);
    return tasks;
  } catch (error) {
    console.log(error)
    error.status = 400
    error.message = error.message
    throw error;
  }
};

const getTaskByName = async (name, fetchSubtasks, fetchLogs) => {
  try {
    return await task.getTaskByName(name, fetchSubtasks, fetchLogs);
  } catch (error) {
    console.log(error)
    error.status = 400
    error.message = error.message
    throw error;
  }
};

// Service method to create a new task
const createTask = async (taskData) => {
  try {
    return await task.createTask(taskData);
  } catch (error) {
    console.log(error)
    error.status = 400;
    throw error;
  }
};

// Service method to update a task
const updateTaskMetaData = async (taskId, taskData) => {
  try {
    return await task.updateTaskMetaData(
      taskId,
      taskData
    );
  } catch (error) {
    console.log(error)
    error.status = 400
    throw error
  }
};

// Service method to delete a task
const deleteTask = async (taskId) => {
  try {
    await task.deleteTask(taskId);
    return;
  } catch (error) {
    console.log(error)
    error.status = 400
    throw error
  }
};

module.exports = {
  getAllTasks,
  getAllTaskNames,
  getTaskById,
  getTaskByName,
  createTask,
  updateTaskMetaData,
  deleteTask
};
