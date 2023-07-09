const subtask = require('../repository/subtask'); // Assuming you have a Task model

// Service method to get all tasks
const getAllSubtasks = async (filter, sortOrder) => {
  try {
    const order = sortOrder.length ? [sortOrder] : [['subtask', 'ASC']]

    return await subtask.getAllSubtasks({where: filter}, order);
  } catch (error) {
    console.log(error)
    error.status = 400
    error.message = error.message
    throw error;
  }
};

const getAllActiveSubtasks = async (includeLogs) => {
  try {
    return await subtask.getAllActiveSubtasks(includeLogs);
  } catch (error) {
    console.log(error)
    error.status = 400
    error.message = error.message
    throw error;
  }
};

const createSubtask = async (subtaskData) => {
  try {
    return await subtask.createSubtask(subtaskData);
  } catch (error) {
    console.log(error)
    error.status = 400;
    throw error;
  }
};

const updateSubtaskMetaData = async (subtaskId, subtaskData) => {
  try {
    return await subtask.updateSubtaskMetaData(
      subtaskId,
      subtaskData
    );
  } catch (error) {
    console.log(error)
    error.status = 400
    throw error
  }
};

module.exports = {
  getAllSubtasks,
  getAllActiveSubtasks,
  createSubtask,
  updateSubtaskMetaData
}