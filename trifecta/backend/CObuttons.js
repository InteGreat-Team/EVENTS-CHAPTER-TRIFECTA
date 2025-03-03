import express from "express";
import pg from "pg";
import cors from "cors";

const { Client } = pg;

const app = express();
const PORT = 3005;

// PostgreSQL Database Connection
const db = new Client({
  user: "postgres", // Change this to your actual PostgreSQL username
  host: "localhost",
  database: "trifecta_logistic", // Your database name
  password: "EironJF121701", // Change this to your actual password
  port: 5432, // Default PostgreSQL port
});

db.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
    createTables(); // Ensure tables are created on startup
  })
  .catch((err) => console.error("❌ Database connection error:", err));

// Middleware
app.use(express.json());
app.use(cors());

// 🛠️ Function to Create Tables if they don't exist
const createTables = async () => {
  const createCustomersTable = `
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      address TEXT NOT NULL,
      city VARCHAR(100),
      state VARCHAR(100),
      country VARCHAR(100),
      zip VARCHAR(20)
    );`;

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  const createOrderItemsTable = `
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
      item_name VARCHAR(255) NOT NULL,
      quantity INTEGER NOT NULL,
      item_description TEXT,
      unit_price NUMERIC(10,2) NOT NULL
    );`;

  try {
    await db.query(createCustomersTable);
    await db.query(createOrdersTable);
    await db.query(createOrderItemsTable);
    console.log("✅ Tables ensured.");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

// 🟢 Add Customer Order (Customer + Order + Items)
app.post("/api/addCO", async (req, res) => {
  try {
    const { customerInfo, items } = req.body;

    // Insert Customer
    const customerQuery = `
      INSERT INTO customers (name, contact, email, address, city, state, country, zip)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
    `;
    const customerValues = [
      customerInfo.name,
      customerInfo.contact,
      customerInfo.email,
      customerInfo.address,
      customerInfo.city,
      customerInfo.state,
      customerInfo.country,
      customerInfo.zip,
    ];
    const customerResult = await db.query(customerQuery, customerValues);
    const customerId = customerResult.rows[0].id;

    // Insert Order
    const orderQuery = `INSERT INTO orders (customer_id) VALUES ($1) RETURNING id;`;
    const orderResult = await db.query(orderQuery, [customerId]);
    const orderId = orderResult.rows[0].id;

    // Insert Order Items
    const itemQuery = `
      INSERT INTO order_items (order_id, item_name, quantity, item_description, unit_price)
      VALUES ($1, $2, $3, $4, $5);
    `;
    for (const item of items) {
      await db.query(itemQuery, [
        orderId,
        item.itemName,
        item.quantity,
        item.itemDescription,
        item.unitPrice || 0, // Default to 0 if no unitPrice provided
      ]);
    }

    res.status(201).json({ message: "Customer order added successfully" });
  } catch (err) {
    console.error("❌ Error adding order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// 🔵 Get All Customer Orders
app.get("/api/orders", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT o.id AS order_id, c.name AS customer_name, c.email, c.contact, c.address, 
             c.city, c.state, c.country, c.zip, o.created_at
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔵 Get Order Details (With Items)
app.get("/api/order/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    const orderDetails = await db.query(
      `SELECT * FROM orders WHERE id = $1`,
      [orderId]
    );
    const items = await db.query(
      `SELECT * FROM order_items WHERE order_id = $1`,
      [orderId]
    );

    if (orderDetails.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      order: orderDetails.rows[0],
      items: items.rows,
    });
  } catch (err) {
    console.error("❌ Error fetching order details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔴 Delete an Order
app.delete("/api/order/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    await db.query("DELETE FROM orders WHERE id = $1", [orderId]);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🟠 Update Customer Information
app.put("/api/customer/:id", async (req, res) => {
  const customerId = req.params.id;
  const { name, contact, email, address, city, state, country, zip } = req.body;

  try {
    const query = `
      UPDATE customers
      SET name = $1, contact = $2, email = $3, address = $4, city = $5, 
          state = $6, country = $7, zip = $8
      WHERE id = $9;
    `;
    await db.query(query, [
      name,
      contact,
      email,
      address,
      city,
      state,
      country,
      zip,
      customerId,
    ]);
    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error("❌ Error updating customer:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🟢 API Root
app.get("/", (req, res) => {
  res.send("🚀 Customer Order API is running!");
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🔥 Server is running at http://localhost:${PORT}`);
});
