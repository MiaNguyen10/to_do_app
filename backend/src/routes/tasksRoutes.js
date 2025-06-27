const express = require('express');
const router = express.Router();
const tasksController = require('../controller/tasksController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.post('/create', authMiddleware, tasksController.createTask);
router.get('/:user_id', authMiddleware, tasksController.getTasksByUserId);
router.get('/detail/:task_id', authMiddleware, tasksController.getTaskById);
router.put('/update/:task_id', authMiddleware, tasksController.updateTaskById);
router.delete('/delete/:task_id', authMiddleware, tasksController.deleteTaskById);

module.exports = router;