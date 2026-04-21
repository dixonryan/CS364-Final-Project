const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "honor",
  password: "Lasvegas100",
  port: 5432,
});

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.get("/probate", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM probate");
    res.json(result.rows);
  } catch (err) {
    console.error("FULL ERROR:", err); // 👈 important
    res.status(500).json({
      error: err.message, // 👈 show real reason
    });
  }
});