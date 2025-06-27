const StatusController = require('../controller/statusController');
const express = require('express');
const router = express.Router();

router.get('/all_status', StatusController.getStatuses);

module.exports = router;