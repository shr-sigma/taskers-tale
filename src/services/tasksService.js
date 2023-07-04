const Task = require('../models/task'); // Assuming you have a Task model

// Service method to get all tasks
const getAllTasks = async (sortOrder) => {
  try {
    const tasks = await Task.getAllTasks(sortOrder.sortBy, sortOrder.orderBy);
    return tasks;
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
    const savedTask = await Task.createTask(taskData);
    return savedTask;
  } catch (error) {
    console.log(error)
    error.status = 400;
    throw error;
  }
};

// Service method to update a task
const updateTaskMetaData = async (taskId, taskData) => {
  try {
    const updatedTask = await Task.updateTaskMetaData(
      taskId,
      taskData
    );
    return updatedTask;
  } catch (error) {
    console.log(error)
    error.status = 400
    throw error
  }
};

// Service method to delete a task
const deleteTask = async (taskId) => {
  try {
    await Task.findByIdAndDelete(taskId);
    return;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to delete task');
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTaskMetaData,
  deleteTask
};
