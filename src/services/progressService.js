const task = require('../repository/task'); // Assuming you have a Task model

const updateProgress = async (progress) => {
  try {
    return await task.updateProgress(
     progress
    );
  } catch (error) {
    console.log(error)
    error.status = 400
    throw error
  }
};

module.exports = {
  updateProgress,
};