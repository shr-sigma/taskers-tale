const { getClient } = require('../models/index');
const {task, subtask, log} = require('../models/task');
const { Sequelize } = require('sequelize');


const getAllTasks = async (filter = {}, order = [], include) => {
  try {
    return await task.findAll({
      ...(filter ? filter: {}),
      order: order,
      ...(include? {include: {
        model: subtask,
        include: [{ model: log }]
      }} : {})
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const getAllTaskNames = async () => {
  try {
    return await task.findAll({
        attributes: ['id', 'task', 'description', 'priority'], // Attributes for tasks table
        include: [
          {
            model: subtask,
            attributes: ['id', 'subtask', 'description', ''], // Attributes for subtasks table
            include: [
              {
                model: subtaskLog,
                attributes: ['id', 'description', 'createdAt'], // Attributes for subtask logs table
              },
            ],
          },
        ], 
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTaskById = async (taskId, fetchSubtasks = false, fetchLogs = false) => {
  try {
    const options = {
      where: { id: taskId },
      include: []
    };

    if (fetchSubtasks) {
      options.include.push({
        model: subtask,
        include: []
      });

      if (fetchLogs) {
        options.include[0].include.push({ model: log });
      }  
    }
    return  await task.findOne(options);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTaskByName = async (name, fetchSubtasks = false, fetchLogs = false) => {
  try {
    const options = {
      where: { task: name },
      include: []
    };

    if (fetchSubtasks) {
      options.include.push({
        model: subtask,
        include: []
      });

      if (fetchLogs) {
        options.include[0].include.push({ model: log });
      }  
    }
    return  await task.findOne(options);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const deletedTask = await task.destroy({ where: { id: taskId } });
    if (deletedTask === 0) {
      throw new Error('Task not found');
    }
    return deletedTask;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createTask = async (taskData) => {
  try {
    return await task.create(taskData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTaskMetaData = async (taskId, updates) => {
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

    const [rowsAffected, [updatedTask]] = await task.update(
      updateFields,
      {
        where: { id: taskId },
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

const updateProgress = async (progress) => {
  const taskIds = progress.map(task => task.taskId)

  await task.update(
    {
      streak: Sequelize.literal('streak + 1'),
      totalDays: Sequelize.literal('"totalDays" + 1'),
    },
    {
      where: {
        id: {
          [Sequelize.Op.in]: taskIds,
        },
      },
    }
  ); 
  await log.bulkCreate(progress);
};

module.exports = {
  getAllTasks,
  getTaskById,
  getTaskByName,
  createTask,
  updateTaskMetaData,
  deleteTask,
  updateProgress
};
