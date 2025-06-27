const db = require("../config/db");

const Status = {
  /**
   * Get all statuses
   */
  getStatuses: async () => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().query(`
            Select * from status`);
        return (await result).recordset;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Status;
