// Express authentication service
import express from "express";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const pgp = pgPromise();

// Database configuration for authentication
const authDb = pgp({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "admin123",
  database: "trifecta",
});

// Middleware
app.use(bodyParser.json());
// Use cors middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Check database connection
authDb
  .connect()
  .then((obj) => {
    obj.done(); // success, release the connection
    console.log("Connected to the database");

    // Continue with setting up your Express app or any other logic
    app.use(bodyParser.json());
    // ... rest of your code

    // Start the Express server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Authentication endpoints
app.post("/api/signup", async (req, res) => {
  try {
    // Extract user signup information from the request body
    const {
      name,
      email,
      password,
      companyName,
      companyAddress,
      companyIndustry,
      selectedServices,
    } = req.body;

    // Perform any necessary validation on the input data
    if (
      !name ||
      !email ||
      !password ||
      !companyName ||
      !companyAddress ||
      !companyIndustry ||
      !selectedServices
    ) {
      return res.status(400).json({ message: "Incomplete signup data" });
    }
    // Hash the user's password before storing it in the database

    // Insert the user's information into the authentication database
    await authDb.none(
      `
        INSERT INTO users 
        (name, email, password, role, company_name, company_address, company_industry, service_procurement, service_inventory, service_logistics) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        name,
        email,
        password,
        "Super Admin",
        companyName,
        companyAddress,
        companyIndustry,
        selectedServices.includes("procurement"),
        selectedServices.includes("inventory"),
        selectedServices.includes("logistics"),
      ]
    );
    // Respond with a success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);

    // Handle specific errors
    if (error.code === "23505") {
      // Duplicate email error (unique violation)
      return res.status(409).json({ message: "Email address already in use" });
    }

    // Respond with an error message if something goes wrong
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/signin", async (req, res) => {
  try {
    // Extract user signin information from the request body
    const { email, password } = req.body;

    // Perform any necessary validation on the input data
    if (!email || !password) {
      return res.status(400).json({ message: "Incomplete signin data" });
    }

    // Check if the user with the provided email exists in the database
    const user = await authDb.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the stored hashed password
    //const passwordMatch = await bcrypt.compare(password, user.password);
    // Note: You should use a secure password hashing library (e.g., bcrypt) for this
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If credentials are valid, generate a token
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);

    // Respond with an error message if something goes wrong
    res.status(500).json({ message: "Internal Server Error" });
  }
});
