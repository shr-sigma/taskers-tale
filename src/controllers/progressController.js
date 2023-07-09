const progressService = require('../services/progressService');

const updateProgress = async (req, res) => {
  try {
    const updatedData = await progressService.updateProgress(req.body);
    res.json(updatedData);
  } catch (error) {
    console.log(error)
    res.status( error.status).json({ error:  error.message });
  }
};

module.exports = {
  updateProgress,
};