import express from "express";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
import cors from "cors";

const app = express();
const pgp = pgPromise();

// Database configuration for authentication
const inventoryDb = pgp({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "EironJF121701",
  database: "trifecta_inventory",
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

// Check database connection
inventoryDb
  .connect()
  .then(() => {
    console.log("Connected to the database");

    // Define API route to fetch data
    app.get("/api/data", async (req, res) => {
      try {
        // Example query to fetch data from a PostgreSQL table
        const data = await inventoryDb.any(
          "SELECT * FROM item ORDER BY itemid"
        );
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define API route to search data
    app.get("/api/search", async (req, res) => {
      try {
        const query = req.query.query;

        // Example query to search for items across all columns
        const searchData = await inventoryDb.any(
          `
          SELECT *
          FROM item
          WHERE CONCAT_WS(' ',
              itemid::text,
              itemname::text,
              itemcategory::text,
              itemdescription::text,
              unitprice::text,
              retailprice::text,
              reorderpoint::text,
              reorderquantity::text,
              totalcost::text
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

    // Define API route to update data (edit)
    app.post("/api/updateItem", async (req, res) => {
      try {
        const {
          itemid,
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

        // Get the original item from the database
        const originalItem = await inventoryDb.oneOrNone(
          "SELECT * FROM item WHERE itemid = $1",
          itemid
        );

        // Update only if unit_price has changed
        const shouldUpdateUnitPrice = originalItem.unitprice !== unitprice;

        // Update only if retail_price has changed
        const shouldUpdateRetailPrice =
          originalItem.retailprice !== retailprice;

        // Prepare the update query based on whether prices should be updated
        let updateQuery;
        if (shouldUpdateUnitPrice && shouldUpdateRetailPrice) {
          updateQuery = `
        UPDATE item
        SET 
          itemname = $2,
          itemcategory = $3,
          itemdescription = $4,
          unitprice = $5,
          retailprice = $6,
          unitpricelastupdate = CURRENT_DATE,
          retailpricelastupdate = CURRENT_DATE,
          reorderpoint = $7,
          reorderquantity = $8,
          manufacturerdate = $9,
          expirationdate = $10,
          totalcost = $11,
          activestatus = $12,
          actionflag = $13
        WHERE itemid = $1
      `;
        } else if (shouldUpdateUnitPrice) {
          updateQuery = `
        UPDATE item
        SET 
          itemname = $2,
          itemcategory = $3,
          itemdescription = $4,
          unitprice = $5,
          unitpricelastupdate = CURRENT_DATE,
          retailprice = $6,
          reorderpoint = $7,
          reorderquantity = $8,
          manufacturerdate = $9,
          expirationdate = $10,
          totalcost = $11,
          activestatus = $12,
          actionflag = $13
        WHERE itemid = $1
      `;
        } else if (shouldUpdateRetailPrice) {
          updateQuery = `
        UPDATE item 
        SET 
          itemname = $2,
          itemcategory = $3,
          itemdescription = $4,
          unitprice = $5,
          retailprice = $6,
          retailpricelastupdate = CURRENT_DATE,
          reorderpoint = $7,
          reorderquantity = $8,
          manufacturerdate = $9,
          expirationdate = $10,
          totalcost = $11,
          activestatus = $12,
          actionflag = $13
        WHERE itemid = $1
      `;
        } else {
          // No price changes, update other fields only
          updateQuery = `
        UPDATE item
        SET 
          itemname = $2,
          itemcategory = $3,
          itemdescription = $4,
          unitprice = $5,
          retailprice = $6,
          reorderpoint = $7,
          reorderquantity = $8,
          manufacturerdate = $9,
          expirationdate = $10,
          totalcost = $11,
          activestatus = $12,
          actionflag = $13
        WHERE itemid = $1
      `;
        }

        await inventoryDb.none(updateQuery, [
          itemid,
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
        ]);

        res.status(200).json({ message: "Item updated successfully" });
      } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Define API route to insert new item (add)
    app.post("/api/addItem", async (req, res) => {
      try {
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

        // Get the current date
        const currentDate = new Date();

        // Example query to insert data into the 'items' table
        const insertQuery = `
      INSERT INTO item
      (itemname, itemcategory, itemdescription, unitprice, retailprice, unitpricelastupdate, retailpricelastupdate, reorderpoint, reorderquantity, manufacturerdate, expirationdate, totalcost, activestatus, actionflag)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;

        await inventoryDb.none(insertQuery, [
          itemname,
          itemcategory,
          itemdescription,
          unitprice,
          retailprice,
          currentDate, // unit_price_last_update
          currentDate, // retail_price_last_update
          reorderpoint,
          reorderquantity,
          manufacturerdate,
          expirationdate,
          totalcost,
          activestatus,
          actionflag,
        ]);

        res.status(201).json({ message: "Item inserted successfully" });
      } catch (error) {
        console.error("Error inserting item:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Start the Express server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
