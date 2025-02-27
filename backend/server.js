require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 3001;

// PostgreSQL Connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "trifecta",
  password: "EironJF121701",
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to Create Table If Not Exists
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS suppliers (
      supplier_id SERIAL PRIMARY KEY,
      supplier_name VARCHAR(255) NOT NULL,
      contact_person VARCHAR(255),
      contact_phone VARCHAR(50),
      company_email VARCHAR(255),
      street VARCHAR(255),
      city VARCHAR(100),
      state VARCHAR(100),
      zipcode VARCHAR(20),
      country VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Table 'suppliers' is ready.");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
};

// Initialize Database Table
createTable();

// Add Supplier API
app.post("/api/addSupplier", async (req, res) => {
  try {
    const {
      suppliername,
      suppliercontact,
      contactphone,
      companyemail,
      street,
      city,
      state,
      zipcode,
      country,
    } = req.body;

    const query = `
      INSERT INTO suppliers (supplier_name, contact_person, contact_phone, company_email, street, city, state, zipcode, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      suppliername,
      suppliercontact,
      contactphone,
      companyemail,
      street,
      city,
      state,
      zipcode,
      country,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error inserting supplier:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

app.get('/api/suppliers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM suppliers;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});