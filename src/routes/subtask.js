var express = require('express');
var router = express.Router();
const subtasksController = require('../controllers/subtasksController');

router.get('/', subtasksController.getAllSubtasks);

router.post('/', subtasksController.createSubtask);

router.patch('/:id', subtasksController.updateSubtask);

router.get('/active', subtasksController.getAllActiveSubtasks)

module.exports = router;