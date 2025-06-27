const db = require("../config/db");
const sql = db.sql;
const bcrypt = require("bcrypt");

const Users = {
  /**
   * Create a new user
   */
  createUser: async (email, password, firstname, lastname) => {
    try {
      const pool = await db.poolPromise;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool
        .request()
        .input("email", sql.VarChar(100), email)
        .input("password", sql.VarChar(255), hashedPassword)
        .input("firstname", sql.VarChar(50), firstname)
        .input("lastname", sql.VarChar(50), lastname).query(`
        INSERT INTO users (email, password, firstname, lastname)
        VALUES (@email, @password, @firstname, @lastname);
        SELECT SCOPE_IDENTITY() AS id;
      `);
      return { id: result.recordset[0].id, email, firstname, lastname };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user by email
   */
  findByEmail: async (email) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("email", sql.VarChar(100), email)
        .query(`SELECT * FROM users WHERE email = @email`);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query(`SELECT * FROM users WHERE id = @id`);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user information
   */
  updateUser: async (id, firstname, lastname) => {
    try {
      const pool = await db.poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("firstname", sql.VarChar(50), firstname)
        .input("lastname", sql.VarChar(50), lastname).query(`
        UPDATE users
        SET firstname = @firstname, lastname = @lastname
        WHERE id = @id;
      `);

      if (result.rowsAffected[0] === 0) {
        throw new Error("User not found or no changes made");
      }
      // Fetch the updated user to return
      const updatedUser = await Users.getUserById(id);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Users;
