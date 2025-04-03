import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost', // Cambia si tu base de datos está en otro servidor
  user: 'root',
  password: 'nathy0741',
  database: 'DomuHouse',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
