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

app.get("/api/addPO", async (req, res) => {
  try {
    const { supplierInfo, items } = req.body;

    // Insert supplier information
    const supplierResult = await db.one(
      `INSERT INTO suppliers (suppliername, suppliercontact, contactphone, companyemail, street, city, state, zipcode, country) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING supplier_id`,
      [
        supplierInfo.suppliername,
        supplierInfo.suppliercontact,
        supplierInfo.contactphone,
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

const handleSubmit = async (e) => {
    if (e) e.preventDefault();
  
    try {
      await axios.post("http://localhost:3006/api/addPO", {
        supplierInfo,
        items,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  const handleSubmitClose = (e) => {
    handleSubmit(e);
    toggleForm();
  };
  