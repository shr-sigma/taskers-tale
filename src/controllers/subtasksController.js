const subtasksService = require('../services/subtaskService');

// Controller method to get all tasks
const getAllSubtasks = async (req, res) => {
  try {
    const filters = {};
    const sortOrder = [];

    for (const key in req.query) {
      if (key === 'sortBy' || key === 'orderBy') {
        sortOrder.push(req.query[key]);
      } else {
        filters[key] = req.query[key];
      }
    }

    const tasks = await subtasksService.getAllSubtasks(filters, sortOrder);
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

const getAllActiveSubtasks = async (req, res) => {
  try {
    const tasks = await subtasksService.getAllActiveSubtasks(req.query.includeLogs);
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

const createSubtask = async (req, res) => {
  try {
    const subtaskData = req.body;
    const newSubtask = await subtasksService.createSubtask(subtaskData);
    res.status(201).json(newSubtask);
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ error: error.message });
  }
};

const updateSubtask = async (req, res) => {
  try {
    const subtaskId = req.params.id;
    const subtaskData = req.body;
    const updatedSubtask = await subtasksService.updateSubtaskMetaData(subtaskId, subtaskData);
    res.json(updatedSubtask);
  } catch (error) {
    console.log(error)
    res.status( error.status).json({ error:  error.message });
  }
};


module.exports = {
  getAllSubtasks,
  getAllActiveSubtasks,
  createSubtask,
  updateSubtask
}