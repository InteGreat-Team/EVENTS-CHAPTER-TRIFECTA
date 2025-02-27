const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "trifecta_inventory",
  password: "EironJF121701",
  port: 5432,
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS inventory (
    item_id SERIAL PRIMARY KEY,
    itemname VARCHAR(255) NOT NULL,
    itemcategory VARCHAR(255) NOT NULL,
    itemdescription TEXT,
    unitprice NUMERIC(10,2) NOT NULL,
    retailprice NUMERIC(10,2) NOT NULL,
    reorderpoint INTEGER NOT NULL,
    reorderquantity INTEGER NOT NULL,
    manufacturerdate DATE NOT NULL,
    expirationdate DATE NOT NULL,
    totalcost NUMERIC(10,2) NOT NULL,
    activestatus TEXT NOT NULL,
    actionflag VARCHAR(50)
  );
`;

pool.query(createTableQuery)
  .then(() => console.log("Inventory table is ready."))
  .catch((err) => console.error("Error creating table:", err));

app.post("/api/addItem", async (req, res) => {
  const {
    itemname,
    itemcategory,
    itemdescription,
    unitprice,
    retailprice,
    reorderpoint,
    reorderquantity,
    manufacturerdate,
    expirationdate,
    totalcost,
    activestatus,
    actionflag,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO inventory (itemname, itemcategory, itemdescription, unitprice, retailprice, reorderpoint, reorderquantity, manufacturerdate, expirationdate, totalcost, activestatus, actionflag)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        itemname,
        itemcategory,
        itemdescription,
        unitprice,
        retailprice,
        reorderpoint,
        reorderquantity,
        manufacturerdate,
        expirationdate,
        totalcost,
        activestatus,
        actionflag,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting item:", error);
    res.status(500).json({ error: "Failed to add item." });
  }
});

app.get("/api/getItems", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to retrieve items." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});