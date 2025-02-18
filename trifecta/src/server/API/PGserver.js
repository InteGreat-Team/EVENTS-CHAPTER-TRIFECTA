import express from "express";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import { Parser } from "json2csv";

const app = express();
const pgp = pgPromise();

// Database configuration for authentication
const db = pgp({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password123",
  // password: 'database',
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

// Check database connection
db.connect()
  .then(() => {
    console.log("Connected to the database");

    // Define API route to fetch data
    app.get("/api/data", async (req, res) => {
      try {
        // Example query to fetch data from a PostgreSQL table
        const data = await db.any("SELECT * FROM supplier ORDER BY supplierid");
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/totalPurchaseRequests", async (req, res) => {
      try {
        const result = await db.any("SELECT COUNT(*) FROM purchaserequest");
        const totalCount = result[0].count;
        res.json({ totalCount: parseInt(totalCount, 10) });
      } catch (error) {
        console.error("Error fetching total purchase requests count:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/pendingPurchaseRequests", async (req, res) => {
      try {
        const result = await db.one(
          "SELECT COUNT(*) FROM purchaserequest WHERE status = $1",
          ["Pending"]
        );
        const pendingCount = parseInt(result.count, 10);
        res.json({ pendingCount });
      } catch (error) {
        console.error("Error fetching pending purchase requests count:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/approvedPurchaseRequests", async (req, res) => {
      try {
        const result = await db.one(
          "SELECT COUNT(*) FROM purchaserequest WHERE status = $1",
          ["Approved"]
        );
        const pendingCount = parseInt(result.count, 10);
        res.json({ pendingCount });
      } catch (error) {
        console.error("Error fetching pending purchase requests count:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/rejectedPurchaseRequests", async (req, res) => {
      try {
        const result = await db.one(
          "SELECT COUNT(*) FROM purchaserequest WHERE status = $1",
          ["Rejected"]
        );
        const pendingCount = parseInt(result.count, 10);
        res.json({ pendingCount });
      } catch (error) {
        console.error("Error fetching pending purchase requests count:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    app.post("/api/updateSupplier", async (req, res) => {
      try {
        const {
          supplierid,
          suppliername,
          contactphone,
          suppliercontact,
          companyemail,
          street,
          city,
          state,
          zipcode,
          country,
        } = req.body;

        // Get the original supplier from the database
        const originalSupplier = await db.oneOrNone(
          "SELECT * FROM supplier WHERE supplierid = $1",
          supplierid
        );

        // Update only if any of the fields have changed
        const shouldUpdate =
          originalSupplier.suppliername !== suppliername ||
          originalSupplier.contactphone !== contactphone ||
          originalSupplier.suppliercontact !== suppliercontact ||
          originalSupplier.companyemail !== companyemail ||
          originalSupplier.street !== street ||
          originalSupplier.city !== city ||
          originalSupplier.state !== state ||
          originalSupplier.zipcode !== zipcode ||
          originalSupplier.country !== country;

        if (!shouldUpdate) {
          return res.status(200).json({ message: "Supplier data unchanged" });
        }

        // Prepare the update query
        const updateQuery = `
          UPDATE supplier
          SET 
            suppliername = $2,
            contactphone = $3,
            suppliercontact = $4,
            companyemail = $5,
            street = $6,
            city = $7,
            state = $8,
            zipcode = $9,
            country = $10
          WHERE supplierid = $1
        `;

        // Execute the update query
        await db.none(updateQuery, [
          supplierid,
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

        res.status(200).json({
          message: "Supplier updated successfully",
        });
      } catch (error) {
        console.error("Error updating supplier:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/api/addSupplier", async (req, res) => {
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
        } = req.body;

        // Get the current date
        const currentDate = new Date();

        // Example query to insert data into the 'items' table
        const insertQuery = `
        INSERT INTO supplier 
        (suppliername, contactphone, suppliercontact, companyemail, street, city, state, zipcode, country)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;

        await db.none(insertQuery, [
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

        res.status(201).json({ message: "Item inserted successfully" });
      } catch (error) {
        console.error("Error inserting item:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.delete("/api/deleteSupplier/:supplierId", async (req, res) => {
      try {
        const { supplierId } = req.params;

        // Delete the supplier from the database
        await db.none("DELETE FROM supplier WHERE supplierid = $1", [
          supplierId,
        ]);

        res.status(200).json({
          message: "Supplier deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting supplier:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Send an error response
      }
    });

    app.post("/api/addPR", async (req, res) => {
      try {
        const { id, suppliername, companyemail, targetDeliveryDate, items } =
          req.body;

        // Get the current date
        const currentDate = new Date();

        // Example query to insert data into the 'items' table
        const insertQuery = `
        INSERT INTO purchaserequest 
        (purchaseno, suppliername, targetdeliverydate, ordercreated, itemname, itemdesc, quantity, status, companyemail)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;

        // Iterate over items and insert each item into the database
        for (const item of items) {
          await db.none(insertQuery, [
            id,
            suppliername,
            targetDeliveryDate,
            currentDate,
            item.item,
            item.itemDescription,
            item.quantity,
            "Pending",
            companyemail,
          ]);
        }

        res.status(201).json({ message: "Inserted successfully" });
      } catch (error) {
        console.error("Error inserting item:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/dataPR", async (req, res) => {
      try {
        // Example query to fetch data from a PostgreSQL table
        const data = await db.any(
          "SELECT DISTINCT ON (purchaseno) * FROM purchaserequest WHERE status = $1",
          ["Pending"]
        );
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/items/:purchaseno", async (req, res) => {
      try {
        const { purchaseno } = req.params;
        // Example query to fetch item data associated with a specific purchaseno
        const itemsData = await db.any(
          "SELECT * FROM purchaserequest WHERE purchaseno = $1",
          [purchaseno]
        );
        res.json(itemsData);
      } catch (error) {
        console.error(`Error fetching item data for purchaseno`, error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/api/approvedStatus", async (req, res) => {
      try {
        const { purchaseno } = req.body;

        // Prepare the update query to set the status to 'Approved'
        const updateQuery = `
          UPDATE purchaserequest
          SET status = 'Approved'
          WHERE purchaseno = $1
        `;

        // Execute the update query
        await db.none(updateQuery, [purchaseno]);

        res.status(200).json({
          message: "Status updated to Approved successfully",
        });
      } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/api/rejectedStatus", async (req, res) => {
      try {
        const { purchaseno, reason } = req.body;

        // Prepare the update query to set the status to 'Approved'
        const updateQuery = `
          UPDATE purchaserequest
          SET status = 'Rejected', reason = $1
          WHERE purchaseno = $2
        `;

        // Execute the update query
        await db.none(updateQuery, [reason, purchaseno]);

        res.status(200).json({
          message: "Status updated to Rejected successfully",
        });
      } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // app.post('/api/rejectedStatus', async (req, res) => {
    //   try {
    //     const { purchaseno, reason } = req.body // Extracting reason from request body

    //     // Prepare the update query to set the status to 'Rejected' and update the reason
    //     const updateQuery = `
    //       UPDATE purchaserequest
    //       SET status = 'Rejected', reason = $2
    //       WHERE purchaseno = $1
    //     `

    //     // Execute the update query
    //     await db.none(updateQuery, [purchaseno, reason])

    //     res
    //       .status(200)
    //       .json({ message: 'Status updated to Rejected successfully' })
    //   } catch (error) {
    //     console.error('Error updating status:', error)
    //     res.status(500).json({ error: 'Internal Server Error' })
    //   }
    // })

    app.get("/api/dataProductStatus", async (req, res) => {
      try {
        // Example query to fetch data from a PostgreSQL table
        const data = await db.any(
          `SELECT DISTINCT ON (purchaseno) *
          FROM purchaserequest
          WHERE purchaseno NOT IN (
            SELECT purchaseordernum FROM purchaseorder
          ) AND status = $1 OR status = $2`,
          ["Approved", "Pending"]
        );
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    const transporter = nodemailer.createTransport({
      service: "gmail", // Use the correct service name
      host: "smtp.gmail.com",
      port: 465, // Specify the port number here
      auth: {
        user: "trifecta1611@gmail.com",
        pass: "vpculguarmwostue",
      },
    });
    app.post("/api/sendEmail", async (req, res) => {
      try {
        const {
          purchaseno,
          suppliername,
          targetdeliverydate,
          ordercreated,
          itemname,
          itemdesc,
          quantity,
          companyemail,
        } = req.body;

        // Fetch data related to the purchase request
        const data = await db.any(
          "SELECT * FROM purchaserequest WHERE purchaseno = $1",
          purchaseno
        );

        // Fetch item names and quantities associated with the purchase request
        const items = await db.any(
          "SELECT itemname, quantity FROM purchaserequest WHERE purchaseno = $1",
          purchaseno
        );

        // Prepare email content
        let itemsList = "";
        items.forEach((item) => {
          itemsList += `${item.itemname}: ${item.quantity}\n          `;
        });

        // Prepare email content
        const mailOptions = {
          from: "trifecta1611@gmail.com",
          to: companyemail,
          subject: "New Purchase Order: " + purchaseno,
          html: `
            <p>Dear ${suppliername},</p>
            <p>We hope this message finds you well.</p>
            <p>We are reaching out to inform you that we have initiated a new purchase order with the following details:</p>
            <p>Purchase Request Number: ${purchaseno}</p>
            <p>Items:</p>
            <table border="1">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.itemname}</td>
                    <td>${item.quantity}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
            <p>As part of our standard procedure, we kindly request that you provide us with the <strong>corresponding invoice detailing the prices for the above items.</strong> Please ensure that the invoice includes all relevant information and any applicable taxes or fees.</p>
            <p>We appreciate your prompt attention to this matter and look forward to receiving the invoice at your earliest convenience.</p>
            <p>If you have any questions or need further clarification, please don't hesitate to contact us.</p>
            <p>Thank you for your cooperation.</p>
            <p>Sincerely,</p>
          `,
        };

        // Send email
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.error("Error sending email:", error); // Log the error
            res.status(500).json({ error: "Failed to send email" });
          } else {
            console.log("Email sent: " + info.response);
            // res.status(200).json({ message: 'Email sent successfully' })
            try {
              await db.tx(async (t) => {
                const queries = data.map((item) =>
                  t.none(
                    "INSERT INTO purchaseorder (purchaseordernum, suppliername, targetdeliverydate, ordercreated, item, itemdescription, quantity, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                    [
                      item.purchaseno,
                      item.suppliername,
                      item.targetdeliverydate,
                      item.ordercreated,
                      item.itemname,
                      item.itemdesc,
                      item.quantity,
                      "Pending",
                    ]
                  )
                );
                await t.batch(queries);
              });
              console.log("Record inserted into sent_emails table");
              res.status(200).json({
                message: "Email sent successfully",
              });
            } catch (insertError) {
              console.error(
                "Error inserting record into sent_emails table:",
                insertError
              );
              res.status(500).json({
                error: "Failed to insert record into sent_emails table",
              });
            }
          }
        });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/dashboardProductStatus", async (req, res) => {
      try {
        // Example query to fetch data from a PostgreSQL table
        const data = await db.any(
          `SELECT DISTINCT ON (purchaseno) *
          FROM purchaserequest
          WHERE purchaseno NOT IN (
            SELECT purchaseordernum FROM purchaseorder
          ) AND status IN ($1, $2, $3)`,
          ["Approved", "Pending", "Rejected"]
        );
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/dataPurchaseOrder", async (req, res) => {
      try {
        const data = await db.any(
          "SELECT DISTINCT ON (purchaseordernum) * FROM purchaseorder"
        );
        res.json(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/itemsPO/:purchaseordernum", async (req, res) => {
      try {
        const { purchaseordernum } = req.params;
        // Example query to fetch item data associated with a specific purchaseno
        const itemsData = await db.any(
          "SELECT * FROM purchaseorder WHERE purchaseordernum = $1",
          [purchaseordernum]
        );
        res.json(itemsData);
      } catch (error) {
        console.error(`Error fetching item data for purchaseno`, error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/api/addPurchaseOrderInfo", async (req, res) => {
      try {
        const {
          purchaseordernum,
          items,
          totalcost,
          invoiceno,
          status,
          orderreceived,
          orderpaid,
        } = req.body;

        // Loop through each updated item and update its unit price in the database
        for (const item of items) {
          const { itemname, unitprice } = item;

          // Example query to update unit price for items with the same purchaseordernum and itemname
          const updateUnitPriceQuery = `
            UPDATE purchaseorder 
            SET unitprice = $1
            WHERE item = $2 AND purchaseordernum = $3
          `;

          await db.none(updateUnitPriceQuery, [
            unitprice,
            itemname,
            purchaseordernum,
          ]);
        }

        const updateQuery = `
          UPDATE purchaseorder 
          SET totalamount = $1, invoiceno = $2, status = $3, orderreceived = $4, orderpaid = $5
          WHERE purchaseordernum = $6
        `;

        await db.none(updateQuery, [
          totalcost,
          invoiceno,
          status,
          orderreceived,
          orderpaid,
          purchaseordernum,
        ]);

        res.status(201).json({
          message: "Purchase order information updated successfully",
        });
      } catch (error) {
        console.error("Error updating purchase order information:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/downloadPurchaseOrder", async (req, res) => {
      try {
        // Fetch data from the purchaseorder table
        const data = await db.any("SELECT * FROM purchaseorder");

        // Convert data to CSV format
        const fields = [
          "purchaseordernum",
          "suppliername",
          "ordercreated",
          "targetdeliverydate",
          "orderpaid",
          "orderreceived",
          "invoiceno",
          "status",
          "item",
          "itemdescription",
          "quantity",
          "unitprice",
          "totalamount",
        ]; // Define fields to include in the CSV
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);

        // Set response headers to trigger file download
        res.header("Content-Type", "text/csv");
        res.attachment("purchaseorder.csv");

        // Send the CSV as response
        res.send(csv);
      } catch (error) {
        console.error("Error generating CSV:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/downloadPurchaseRequest", async (req, res) => {
      try {
        const data = await db.any("SELECT * FROM purchaserequest");

        // Convert data to CSV format
        const fields = [
          "purchaseno",
          "suppliername",
          "ordercreated",
          "targetdeliverydate",
          "companyemail",
          "itemname",
          "itemdesc",
          "quantity",
          "unitprice",
          "status",
          "reason",
        ]; // Define fields to include in the CSV
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(data);

        // Set response headers to trigger file download
        res.header("Content-Type", "text/csv");
        res.attachment("purchaserequest.csv");

        // Send the CSV as response
        res.send(csv);
      } catch (error) {
        console.error("Error generating CSV:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Start the Express server
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
