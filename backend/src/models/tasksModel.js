const db = require("../config/db");
const sql = db.sql;

const Tasks = {
  /**
   * Create a new task
   */
  createTask: async (
    user_id,
    title,
    status_id,
    priority_id,
    description,
    due_date
  ) => {
    try {
      const pool = await db.poolPromise;
      const created_at = new Date();
      const updated_at = new Date();
      const result = await pool
        .request()
        .input("user_id", sql.Int, user_id)
        .input("title", sql.VarChar(200), title)
        .input("status_id", sql.Int, status_id)
        .input("priority_id", sql.Int, priority_id)
        .input("description", sql.Text, description)
        .input("due_date", sql.Date, due_date)
        .input("created_at", sql.DateTime, created_at)
        .input("updated_at", sql.DateTime, updated_at).query(`
      INSERT INTO tasks (user_id, title, status_id, priority_id, description, due_date, created_at, updated_at)
      VALUES (@user_id, @title, @status_id, @priority_id, @description, @due_date, @created_at, @updated_at);
      SELECT SCOPE_IDENTITY() AS id`);

      return (await result).recordset[0].id;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all tasks by user ID
   */
  getTasksByUserId: async (user_id) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().input("user_id", sql.Int, user_id)
        .query(`
            SELECT t.id, t.title, t.status_id, s.name as status, t.priority_id, p.name as priority, t.description, t.due_date, t.created_at, t.updated_at from tasks t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN priority p ON t.priority_id = p.id
            WHERE u.id = @user_id
            ORDER BY t.created_at DESC    
            `);
      return (await result).recordset;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a task by its ID
   */
  getTaskById: async (task_id) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool.request().input("task_id", sql.Int, task_id)
        .query(`
            SELECT t.id, t.title, s.name as status, p.name as priority, t.description, t.due_date, t.created_at, t.updated_at from tasks t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN status s ON t.status_id = s.id
            LEFT JOIN priority p ON t.priority_id = p.id
            WHERE t.id = @task_id
        `);
      return (await result).recordset[0];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a task by its ID
   */
  updateTaskById: async (
    task_id,
    title,
    status_id,
    priority_id,
    description,
    due_date
  ) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("task_id", sql.Int, task_id)
        .input("title", sql.VarChar(200), title)
        .input("status_id", sql.Int, status_id)
        .input("priority_id", sql.Int, priority_id)
        .input("description", sql.Text, description)
        .input("due_date", sql.Date, due_date).query(`
            UPDATE tasks
            SET title = @title,
                status_id = @status_id,
                priority_id = @priority_id,
                description = @description,
                due_date = @due_date,
                updated_at = GETDATE()
            WHERE id = @task_id;
        `);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a task by its ID
   */
  deleteTaskById: async (task_id) => {
    try {
      const pool = await db.poolPromise;
      await pool.request().input("task_id", sql.Int, task_id).query(`
            DELETE FROM tasks
            WHERE id = @task_id;
        `);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Tasks;
