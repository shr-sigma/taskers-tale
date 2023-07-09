var express = require('express');
var router = express.Router();
const progressController = require('../controllers/progressController');

router.patch('/', progressController.updateProgress);

module.exports = router;