// index.js
const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Ensure this is correct
  database: 'test', // Ensure this database exists
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const sql = 'INSERT INTO customers_tbl (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
    res.status(201).json({ message: 'Registration successful!' });
  });
});

app.get('/api/user/:email', (req, res) => {
  const { email } = req.params;
  const sql = 'SELECT * FROM customers_tbl WHERE email = ?';
  db.query(sql, [email], (error, results) => {
    if (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).send(error);
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(results[0]);
  });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
