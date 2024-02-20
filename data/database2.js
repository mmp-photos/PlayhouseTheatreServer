import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

function handleDisconnect() {
  connection.getConnection(function(err, conn) {
    if (err) {
      console.error('Error connecting to database:', err);
      setTimeout(handleDisconnect, 2000); // Attempt to reconnect after 2 seconds
    } else {
      console.log('Connected to database');
      conn.release(); // Release the connection
    }
  });

  connection.on('error', function(err) {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// Example function to execute queries
async function runQuery(sql, values) {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows, fields] = await connection.query(sql, values);
      return rows;
    } finally {
      connection.release(); // release the connection after query execution
      console.log(`Connection was released`)
    }
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

export default runQuery;