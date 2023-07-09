const { getClient } = require('../models/index');
const {task, subtask, log} = require('../models/task');

// Model method to get all tasks
const getAllSubtasks = async (filter = {}, order) => {
  try {
    return await subtask.findAll({
      ...(filter ? filter: {}),
      order: order,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllActiveSubtasks = async (includeLogs) => {
  try {
    const include = [
      {
        model: task
      },
    ]

    if (includeLogs) {
      include.push( {
        model: log
      },)
    }

    return await subtask.findAll({
      where: {
        isActive: true
      },
        include: include,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Model method to create a new task
const createSubtask = async (subtaskData) => {
    try {
      return await subtask.create(subtaskData);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

const updateSubtaskMetaData = async (subtaskId, updates) => {
  try {
    const updateFields = {};
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        updateFields[key] = updates[key];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      // If there are no properties to update, return early
      throw new Error('Task not found');
    }

    const [rowsAffected, [updatedTask]] = await subtask.update(
      updateFields,
      {
        where: { id: subtaskId },
        returning: true,
      }
    );

    if (rowsAffected === 0) {
      throw new Error('Task not found');
    }

    return updatedTask;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  

module.exports = {
  getAllSubtasks,
  createSubtask,
  getAllActiveSubtasks,
  updateSubtaskMetaData
};
