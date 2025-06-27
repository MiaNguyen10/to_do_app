const PriorityController = require("../models/priorityModel");

/**
 * Get all priorities
 */
exports.getPriorities = async (req, res) => {
  try {
    const priorities = await PriorityController.getPriorities();
    res.status(200).json({
      message: "Priorities retrieved successfully",
      priorities: priorities,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
