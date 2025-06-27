const PriorityController = require('../controller/priorityController');
const express = require('express');
const router = express.Router();

router.get('/all_priority', PriorityController.getPriorities);

module.exports = router;