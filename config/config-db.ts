import mysql from 'mysql2';
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = db.promise();

async function testConnection() {
  try {
    const [result] = await promisePool.query('SELECT 1 as test');
    console.log('✅ Conexión a la base de datos establecida correctamente:', result);
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

testConnection();

export default promisePool;
