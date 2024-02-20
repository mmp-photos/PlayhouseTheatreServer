// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// var mysql = require('mysql2');


// export const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// });

// pool.getConnection((err,connection)=> {
//   if(err)
//   throw err;
//   console.log('Database connected successfully');
//   connection.release();
// });

// export default pool;