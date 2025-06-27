const sql = require('mssql');
require("dotenv").config(); // Load environment variables

// Database configuration
const config = {
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123!@',
    server: process.env.DB_SERVER || 'THU_HA_NGUYEN',
    database: process.env.DB_DATABASE || 'to_do_app',
    port: parseInt(process.env.DB_PORT) || 1433, // Default SQL Server port
    options: {
        encrypt: true, // Use encryption for the connection
        trustServerCertificate: true, // Trust self-signed certificates
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed!', err);
        throw err;
    });

module.exports = {sql, config, poolPromise};
