const db = require("../config/db");

const Priority = {
  /**
   * Get all priorities
   */
  getPriorities: async () => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().query(`
            SELECT * FROM priority
        `);
      return (await result).recordset;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Priority;
