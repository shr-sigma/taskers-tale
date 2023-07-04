var express = require('express');
var router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getAllTasks);

router.post('/', tasksController.createTask);

router.patch('/:id', tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);
  
module.exports = router;
