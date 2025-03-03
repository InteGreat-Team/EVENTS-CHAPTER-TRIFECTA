import express from "express";
import pgPromise from "pg-promise";
import cors from "cors";

const pgp = pgPromise();

const db = pgp({
  host: "localhost",
  port: 5432,
  database: "trifecta_logistic",
  user: "postgres",
  password: "EironJF121701",
});

const app = express();
app.use(express.json());
app.use(cors());

// Function to create tables if they don't exist
const createTables = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS suppliers (
        supplier_id SERIAL PRIMARY KEY,
        suppliername VARCHAR(255) NOT NULL,
        suppliercontact VARCHAR(255) NOT NULL,
        companyemail VARCHAR(255) UNIQUE NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zipcode VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS purchase_orders (
        order_id SERIAL PRIMARY KEY,
        supplier_id INT NOT NULL REFERENCES suppliers(supplier_id) ON DELETE CASCADE,
        item_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL CHECK (quantity > 0),
        item_description TEXT
      );
    `);
    console.log("Tables checked/created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

// Create tables before starting the server
createTables();

app.post("/api/addPO", async (req, res) => {
  try {
    const { supplierInfo, items } = req.body;

    if (!supplierInfo || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Insert supplier information
    const supplierResult = await db.one(
      `INSERT INTO suppliers (suppliername, suppliercontact, companyemail, street, city, state, zipcode, country) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING supplier_id`,
      [
        supplierInfo.suppliername,
        supplierInfo.suppliercontact,
        supplierInfo.companyemail,
        supplierInfo.street,
        supplierInfo.city,
        supplierInfo.state,
        supplierInfo.zipcode,
        supplierInfo.country,
      ]
    );

    const supplierId = supplierResult.supplier_id;

    // Insert items
    for (const item of items) {
      await db.none(
        `INSERT INTO purchase_orders (supplier_id, item_name, quantity, item_description) 
         VALUES ($1, $2, $3, $4)`,
        [supplierId, item.itemName, item.quantity, item.itemDescription]
      );
    }

    res.status(201).json({ message: "Purchase order added successfully" });
  } catch (error) {
    console.error("Error adding purchase order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
