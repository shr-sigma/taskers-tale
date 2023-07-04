var express = require('express');
var router = express.Router();

router.get('/live', function(req, res, next) {
  res.status(200).json(`Tasker's tale Backend is up and running`);
});

module.exports = router;
