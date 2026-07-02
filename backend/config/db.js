const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => {
    console.log("✅ PostgreSQL Connected");
  })
  .catch((err) => {
    console.log("❌ PostgreSQL Error:", err.message);
  });

module.exports = db;