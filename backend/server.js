//file: server.js
// USAFA CS 364 
// Lesson 27 Authentication example
 
const express = require("express");
const crypto = require('crypto');
const session = require("express-session");
const pool = require('./db');
const auth = require("./auth");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false} // would be set to true if using HTTPS
  })
);

// Route handler for GET /
app.get('/', (req, res) => {
  const currentTime = new Date().toString();
  res.send(`Current server time: ${currentTime}`);
});

// Route handler for GET /api/
app.get('/api/', (req, res) => {
  const currentTime = new Date().toString();
  res.send(`Current API time: ${currentTime}`);
});

// ======================
// PROBATE LOOKUP ROUTES
// ======================

// Search Probates
app.get('/api/probates', async (req, res) => {
    const { search, studentId } = req.query;

    try {
        let queryText = `
            SELECT name, probateid, startdate, enddate, squad, classyear 
            FROM probate 
            WHERE 1=1`;
        const params = [];

        if (search) {
            queryText += ` AND name ILIKE $1`;
            params.push(`%${search}%`);
        }
        if (studentId) {
            queryText += ` AND student_id = $${params.length + 1}`;
            params.push(parseInt(studentId));
        }

        queryText += ` ORDER BY name`;

        const result = await pool.query(queryText, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Add New Probate (Optional for now)
app.post('/api/probates', async (req, res) => {
    const { name, probateid, startdate, enddate, squad, classyear, student_id } = req.body;
    
    try {
        const result = await pool.query(`
            INSERT INTO probate (name, probateid, startdate, enddate, squad, classyear, student_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [name, probateid, startdate, enddate, squad, classyear, student_id]);
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
  });

// app.post("/api/register", auth.register);

//const saltRounds = 10;


app.post("/api/register", async (req, res) => {

  console.log("server.js: register ");
  const { username, password, role } = req.body;

  console.log(`server.js: register username: ${username}`);
  // console.log(`server.js: register email: ${email}`);
  console.log(`server.js: register password: ${password}`);
  console.log(`server.js: register role: ${role}`);

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  const query = 'INSERT INTO users (username, hash, salt, role) VALUES ($1, $2, $3, $4) RETURNING id';

  const values = [username, hash, salt, role];
  console.log("trying query with these values...");
  console.log(values);

  try {
    const result = await pool.query(query, values);
    console.log("user NOW registered ... going to respond");
    console.log(result);
    res.json({ success: true, message: `${role} account created`, username: `${username}` }); 
  } catch (error) {
    console.log("in catch block of server.js/register");
    console.log(error);
    res.json({ success: false, message: 'Username or email already exists.' });
  }
});


app.post("/api/login", auth.login);

app.get("/api/users", auth.ensureAdmin, async (req, res) => {
  console.log("in GET /users");
  const result = await pool.query("SELECT username, role FROM users");
  console.log(`GET /users rows: ${result.rows}`);
  res.json(result.rows);
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

app.get("/api/session", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
