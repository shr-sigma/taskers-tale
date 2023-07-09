var express = require('express');
var router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getAllTasks);

router.get('/name', tasksController.getAllTaskNames);

router.post('/', tasksController.createTask);

router.get('/:id', tasksController.getTaskById);

// router.get('/name/:name', tasksController.getTaskByName);

router.patch('/:id', tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);
  
module.exports = router;
