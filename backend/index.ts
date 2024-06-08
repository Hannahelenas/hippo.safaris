import { Request, Response } from "express";
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import { Database } from "sqlite";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import express from "express";

// Interfaces
interface Safari {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  country: string;
}

interface Order {
  email: string;
  lastName: string;
  name: string;
  phone: string;
  totalCost: number;
  products: Product[];
}

interface Product {
  name: string;
  quantity: number;
  date: string;
}

interface Message {
  email: string;
  name: string;
  phone: string;
  message: string;
}

// Database configuration
let database: Database;

(async () => {
  database = await sqlite.open({
    driver: sqlite3.Database,
    filename: "data.sqlite",
  });

  await database.run("PRAGMA foreign_keys = ON");
  console.log("Database ready");
})();

// Create an instance of an Express application.
const app = express();

// Serve static files from the "dist" directory.
app.use(express.static(path.join(path.resolve(), "dist")));

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(cors());

// Parse incoming requests with JSON payloads, handle JSON data in POST requests.
app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads, handle form submissions.
app.use(bodyParser.urlencoded({ extended: true }));

/* app.get('/api', (_request: Request, response: Response) => {
    response.send({ hello: 'World' });
});
 */

// Endpoint for all safaris
app.get("/safaris", async (_req: Request, res: Response) => {
  try {
    const safaris: Safari[] = await database.all("SELECT * FROM Safaris");
    res.status(200).json(safaris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for one safari
app.get("/safaris/:safariId", async (req: Request, res: Response) => {
  const id: string = req.params.safariId;

  if (!id || id.trim() === "") {
    return res.status(400).json({ error: "safariId cannot be empty" });
  }

  try {
    const safari: Safari[] = await database.all(
      "SELECT * FROM Safaris WHERE id = ?",
      [id],
    );

    if (safari.length === 0) {
      return res.status(404).json({ error: "Safari not found" });
    }

    res.status(200).json(safari);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint for classic safaris
app.get("/classic", async (_req: Request, res: Response) => {
  const category: string = "Classic";
  try {
    const classicSafaris: Safari[] = await database.all(
      "SELECT * FROM Safaris WHERE category = ?",
      [category],
    );

    if (classicSafaris.length === 0) {
      return res.status(404).json({ error: "No classic safaris found" });
    }

    res.status(200).json(classicSafaris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint for family safaris
app.get("/family", async (_req: Request, res: Response) => {
  const category: string = "Family";
  try {
    const familySafaris: Safari[] = await database.all(
      "SELECT * FROM Safaris WHERE category = ?",
      [category],
    );

    if (familySafaris.length === 0) {
      return res.status(404).json({ error: "No family safaris found" });
    }

    res.status(200).json(familySafaris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Endpoint for premium safaris
app.get("/premium", async (_req: Request, res: Response) => {
  const category: string = "Premium";
  try {
    const premiumSafaris: Safari[] = await database.all(
      "SELECT * FROM Safaris WHERE category = ?",
      [category],
    );

    if (premiumSafaris.length === 0) {
      return res.status(404).json({ error: "No premium safaris found" });
    }

    res.status(200).json(premiumSafaris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Enpoint to serve all get requests with main index.html file.
app.get("*", (_request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Endpoint for posting order.
app.post("/orders", async (req: Request, res: Response) => {
  try {
    // Extract data from post request.
    const { email, lastName, name, phone, totalCost, products }: Order =
      req.body;

    // Validation for order.
    if (!email || !lastName || !name || !phone || !totalCost || !products) {
      return res
        .status(400)
        .json({ error: "The order must include required fields and products" });
    }

    // Validation for name and lastname.
    const nameRegex = /^[a-zA-Z\s]+$/u;

    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ error: "Name must contain only letters and hyphens" });
    }

    if (!nameRegex.test(lastName)) {
      return res
        .status(400)
        .json({ error: "Last name must contain only letters and hyphens" });
    }

    // Validation for email format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validation for phone number format.
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // Add new order to orders table.
    const result = await database.run(
      `
            INSERT INTO orders (email, last_name, name, phone, total_cost)
            VALUES (?, ?, ?, ?, ?)
        `,
      [email, lastName, name, phone, totalCost],
    );

    // Get the latest orderid.
    const orderId = result.lastID;

    // Add products to the order details table.
    for (const product of products) {
      await database.run(
        `
                INSERT INTO order_details (order_id, product_name, quantity, start_date )
                VALUES (?, ?, ?, ?)
            `,
        [orderId, product.name, product.quantity, product.date],
      );
    }

    res.status(201).json({
      message: "Order created successfully",
      orderId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for posting messages.
app.post("/messages", async (req: Request, res: Response) => {
  try {
    // Extracting data from post request body.
    const { email, name, phone, message }: Message = req.body;
/*
    // Validation of input data.
    if (!email || !name || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

     // Validation for email format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validation name format.
    const nameRegex = /^[a-zA-Z\s]+$/u;
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ error: "Name must contain only letters" });
    }

   // Validation for phone number format.
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

   // Validation for message format.
     const messageRegex = /^[^\n\r\S]*(?:[a-zA-Z0-9.,!? åäöÅÄÖ\n\r\t]{20,1000})[^\n\r\S]*$/;
    if (!messageRegex.test(message)) {
      return res.status(400).json({ error: "Invalid message format" });
    } */

    // Add the new message to database table messages.
    const result = await database.run(
      `
            INSERT INTO messages (email, name, phone, message)
            VALUES (?, ?, ?, ?)
        `,
      [email, name, phone, message],
    );
    console.log("Database insert result:", result);

    // Testing a select to see the message
    const insertedMessage = await database.get(
        `SELECT * FROM messages WHERE id = ?`,
        [result.lastID],
      );
      console.log("Inserted message:", insertedMessage);

    res.status(201).json({
      message: "Message received",
      messageId: result.lastID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Port listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
