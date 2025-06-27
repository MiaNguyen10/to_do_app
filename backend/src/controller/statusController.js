const StatusModel = require("../models/statusModel");

/**
 * Get all statuses
 */
exports.getStatuses = async (req, res) => {
  try {
    const statuses = await StatusModel.getStatuses();
    res.status(200).json({
      message: "Statuses retrieved successfully",
      statuses: statuses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
