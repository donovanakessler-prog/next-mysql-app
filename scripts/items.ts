import 'dotenv/config';
import mysql from 'mysql2/promise';

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });

  //* Create DB
  await connection.query(`CREATE DATABASE IF NOT EXISTS sample_db`);
  await connection.query(`USE sample_db`);

  //* Create table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      description TEXT
    )
  `);

  //* Clear old data (optional)
  await connection.query(`DELETE FROM items`);

  //* Insert data
  for (let i = 1; i <= 50; i++) {
    await connection.query(
      `INSERT INTO items (name, description) VALUES (?, ?)`,
      [`Item ${i}`, `Description ${i}`]
    );
  }

  console.log('🌱 Database seeded successfully');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});