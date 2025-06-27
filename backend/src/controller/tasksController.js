const TasksModel = require("../models/tasksModel");

/**
 * Create a new task
 */
exports.createTask = async (req, res) => {
  try {
    const { user_id, title, status_id, priority_id, description, due_date } =
      req.body;

    // Validate required fields
    if (!user_id || !title || !status_id || !priority_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new task
    const newTaskId = await TasksModel.createTask(
      user_id,
      title,
      status_id,
      priority_id,
      description,
      due_date
    );

    res.status(201).json({
      message: "Task created successfully",
      task_id: newTaskId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all tasks for a user
 */
exports.getTasksByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Validate user_id
    if (!user_id) {
      return res.status(400).json({ message: "User is required" });
    }

    // Get tasks by user ID
    const tasks = await TasksModel.getTasksByUserId(user_id);

    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get task by task ID
 */
exports.getTaskById = async (req, res) => {
  try {
    const { task_id } = req.params;
    // Validate task_id
    if (!task_id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    // Get task by ID
    const task = await TasksModel.getTaskById(task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task retrieved successfully",
      task: task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update task by task ID
 */
exports.updateTaskById = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, status_id, priority_id, description, due_date } = req.body;

    // Validate required fields
    if (!task_id || !title || !status_id || !priority_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Update task by ID
    await TasksModel.updateTaskById(
      task_id,
      title,
      status_id,
      priority_id,
      description,
      due_date
    );

    // Check if task was updated
    const updatedTask = await TasksModel.getTaskById(task_id);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Respond with success message
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete task by task ID
 */
exports.deleteTaskById = async (req, res) => {
  try {
    const { task_id } = req.params;
    // Validate task_id
    if (!task_id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    // Delete task by ID
    await TasksModel.deleteTaskById(task_id);
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
