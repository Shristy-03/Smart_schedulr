import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',       // MySQL is running on your machine
  user: 'root',            // Default MySQL admin user
  password: 'cUeT@456',    // Your MySQL password
  database: 'schedulr'     // The database you just created
});

export default pool;