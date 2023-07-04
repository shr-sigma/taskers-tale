const { getClient } = require('./index');

// Model method to get all tasks
const getAllTasks = async (sortBy = 'priority', orderBy = 'ASC') => {
  try {
    const client = getClient();
    const query = `SELECT * FROM "task" ORDER BY ${sortBy} ${orderBy}` ;
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

// Model method to create a new task
const createTask = async (taskData) => {
  try {
    const client = getClient();
    const query = `
      INSERT INTO "task" (task, description, priority)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [
      taskData.task,
      taskData.description,
      taskData.priority,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error)
    throw error;
  }
};

const updateTaskMetaData = async (taskId, updates) => {
    try {
      const client = getClient();
      const query = `
      UPDATE "task"
      SET
        description = COALESCE($1, description),
        priority = COALESCE($2, priority)
      WHERE Id = $3
      RETURNING *;
    `;
      const values = [updates.description, updates.priority, taskId];
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  };
  

module.exports = {
  getAllTasks,
  createTask,
  updateTaskMetaData
};
