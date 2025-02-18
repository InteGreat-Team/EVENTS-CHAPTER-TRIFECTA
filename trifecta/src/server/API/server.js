import express from "express";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
import cors from "cors";

/* const express = require('express');
const cors = require('cors');
const { logisticsDb } = require('pg'); */

const app = express();
const pgp = pgPromise();
const port = 5173;

const logisticsDb = pgp({
  host: "localhost",
  user: "postgres",
  port: 5432,
  // password: 'password2023',
  password: "password123",
  database: "postgres",
});

// Middleware
app.use(bodyParser.json());

// Use cors middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's origin
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);

//Database connection
logisticsDb
  .connect()
  .then(() => {
    console.log("Connected.");

    //API route to fetch data
    app.get("/api/data", async (req, res) => {
      try {
        const data = await logisticsDb.any("SELECT * FROM purchaseorder ");
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/api/addPO", async (req, res) => {
      try {
        const {
          suppliername,
          contactphone,
          suppliercontact,
          companyemail,
          street,
          city,
          state,
          zipcode,
          country,
        } = req.body.supplierInfo; // Extract supplier information from request body

        const items = req.body.items;

        const currentDate = new Date();
        const id = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}${currentDate
          .getHours()
          .toString()
          .padStart(2, "0")}${currentDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}${currentDate
          .getSeconds()
          .toString()
          .padStart(2, "0")}`;

        // Example query to insert data into the 'items' table
        const insertSupplierQuery = `
              INSERT INTO supplier 
              (suppliername, contactphone, suppliercontact, companyemail, street, city, state, zipcode, country)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `;

        const insertItemsQuery = `
              INSERT INTO purchaseorder 
              (purchaseordernum, suppliername, item, itemdescription, quantity)
              VALUES ($1, $2, $3, $4, $5)
            `;

        await logisticsDb.none(insertSupplierQuery, [
          suppliername,
          contactphone,
          suppliercontact,
          companyemail,
          street,
          city,
          state,
          zipcode,
          country,
        ]);

        for (const item of items) {
          await logisticsDb.none(insertItemsQuery, [
            id, // Use the generated ID as supplier_id for each item
            suppliername,
            item.itemName,
            item.quantity,
            item.itemDescription,
          ]);
        }

        res.status(201).json({ message: "Item inserted successfully" });
      } catch (error) {
        console.error("Error inserting item:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/datasupplier", async (req, res) => {
      try {
        const { suppliername } = req.query;
        let data;

        if (suppliername) {
          data = await logisticsDb.any(
            "SELECT * FROM supplier WHERE suppliername = $1",
            [suppliername]
          );
        } else {
          // If no specific suppliername is provided, fetch all suppliers
          data = await logisticsDb.any("SELECT * FROM supplier");
        }

        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/dataOutbound", async (req, res) => {
      try {
        const data = await logisticsDb.any(
          "SELECT * FROM OutboundShipmentFact"
        );
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/customerDetails/:customerorderid", async (req, res) => {
      const { customerorderid } = req.params;
      try {
        const query = `
            SELECT o.customerorderid, c.customername, c.customeremail
            FROM OutboundShipmentFact o
            LEFT JOIN CustomerOrder c ON o.customerorderid = c.customerorderid
            WHERE o.customerorderid = $1
          `;
        const result = await pool.query(query, [customerorderid]);
        res.json(result.rows[0]);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/api/search-inbound", async (req, res) => {
      try {
        const query = req.query.query;

        // Example query to search for items across all columns
        const searchData = await logisticsDb.any(
          `
            SELECT *
            FROM purchaseorder
            WHERE CONCAT_WS(' ',
            purchaseordernum::text,
                suppliername::text,
                supplier::text,
                item::text,
            ) ILIKE $1
            `,
          [`%${query}%`]
        );

        res.json(searchData);
      } catch (error) {
        console.error("Error searching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/search-outbound", async (req, res) => {
      try {
        const query = req.query.query;

        // Example query to search for items across all columns
        const searchData = await logisticsDb.any(
          `
            SELECT *
            FROM OutboundShipmentFact
            WHERE CONCAT_WS(' ',
            OutboundShipmentID::text,
                ItemID::text,
                supplier::text,
                ShippingStatus::text,
            ) ILIKE $1
            `,
          [`%${query}%`]
        );

        res.json(searchData);
      } catch (error) {
        console.error("Error searching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Start the Express server
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
