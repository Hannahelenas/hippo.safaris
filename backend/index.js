"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite = __importStar(require("sqlite"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
// Database configuration
let database;
(() => __awaiter(void 0, void 0, void 0, function* () {
    database = yield sqlite.open({
        driver: sqlite3_1.default.Database,
        filename: "data.sqlite",
    });
    yield database.run("PRAGMA foreign_keys = ON");
    console.log("Database ready");
}))();
// Create an instance of an Express application.
const app = (0, express_1.default)();
// Serve static files from the "dist" directory.
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "dist")));
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use((0, cors_1.default)());
// Parse incoming requests with JSON payloads, handle JSON data in POST requests.
app.use(body_parser_1.default.json());
// Parse incoming requests with URL-encoded payloads, handle form submissions.
app.use(body_parser_1.default.urlencoded({ extended: true }));
/* app.get('/api', (_request: Request, response: Response) => {
    response.send({ hello: 'World' });
});
 */
// Endpoint for all safaris
app.get("/safaris", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const safaris = yield database.all("SELECT * FROM Safaris");
        res.status(200).json(safaris);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Endpoint for one safari
app.get("/safaris/:safariId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.safariId;
    if (!id || id.trim() === "") {
        return res.status(400).json({ error: "safariId cannot be empty" });
    }
    try {
        const safari = yield database.all("SELECT * FROM Safaris WHERE id = ?", [id]);
        if (safari.length === 0) {
            return res.status(404).json({ error: "Safari not found" });
        }
        res.status(200).json(safari);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
//Endpoint for classic safaris
app.get("/classic", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = "Classic";
    try {
        const classicSafaris = yield database.all("SELECT * FROM Safaris WHERE category = ?", [category]);
        if (classicSafaris.length === 0) {
            return res.status(404).json({ error: "No classic safaris found" });
        }
        res.status(200).json(classicSafaris);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
//Endpoint for family safaris
app.get("/family", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = "Family";
    try {
        const familySafaris = yield database.all("SELECT * FROM Safaris WHERE category = ?", [category]);
        if (familySafaris.length === 0) {
            return res.status(404).json({ error: "No family safaris found" });
        }
        res.status(200).json(familySafaris);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
//Endpoint for premium safaris
app.get("/premium", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = "Premium";
    try {
        const premiumSafaris = yield database.all("SELECT * FROM Safaris WHERE category = ?", [category]);
        if (premiumSafaris.length === 0) {
            return res.status(404).json({ error: "No premium safaris found" });
        }
        res.status(200).json(premiumSafaris);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Enpoint to serve all get requests with main index.html file.
app.get("*", (_request, response) => {
    response.sendFile(path_1.default.join(__dirname, "dist", "index.html"));
});
// Endpoint for posting order.
app.post("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from post request.
        const { email, lastName, name, phone, totalCost, products } = req.body;
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
        const result = yield database.run(`
            INSERT INTO orders (email, last_name, name, phone, total_cost)
            VALUES (?, ?, ?, ?, ?)
        `, [email, lastName, name, phone, totalCost]);
        // Get the latest orderid.
        const orderId = result.lastID;
        // Add products to the order details table.
        for (const product of products) {
            yield database.run(`
                INSERT INTO order_details (order_id, product_name, quantity, start_date )
                VALUES (?, ?, ?, ?)
            `, [orderId, product.name, product.quantity, product.date]);
        }
        res.status(201).json({
            message: "Order created successfully",
            orderId,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Endpoint for posting messages.
app.post("/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting data from post request body.
        const { email, name, phone, message } = req.body;
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
        }
        // Add the new message to database table messages.
        const result = yield database.run(`
            INSERT INTO messages (email, name, phone, message)
            VALUES (?, ?, ?, ?)
        `, [email, name, phone, message]);
        res.status(201).json({
            message: "Message received",
            messageId: result.lastID,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Port listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
