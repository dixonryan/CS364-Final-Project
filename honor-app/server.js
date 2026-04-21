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


app.post("/users", async (req, res) => {
  console.log("HIT /users");        // 🔍 must show in terminal
  console.log(req.body);            // 🔍 must show data

  try {
    const { username, password } = req.body;

    const result = await pool.query(
      `INSERT INTO staff (username, password)
       VALUES ($1, $2)
       RETURNING *`,
      [username, password]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});