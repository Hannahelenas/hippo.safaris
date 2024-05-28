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
let database;
(() => __awaiter(void 0, void 0, void 0, function* () {
    database = yield sqlite.open({
        driver: sqlite3_1.default.Database,
        filename: 'data.sqlite'
    });
    yield database.run('PRAGMA foreign_keys = ON');
    console.log('Redo att göra databasanrop');
}))();
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'dist')));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/api', (_request, response) => {
    response.send({ hello: 'World' });
});
// Endpoint for all safaris
app.get('/safaris', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const safaris = yield database.all('SELECT * FROM Safaris');
        res.json(safaris);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Endpoint for one safari
app.get('/safaris/:safariId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.safariId;
    try {
        const safari = yield database.all('SELECT * FROM Safaris WHERE id = ?', [id]);
        res.json(safari);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//Endpoint for classic safaris
app.get('/classic', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = 'Classic';
    try {
        const classicSafaris = yield database.all('SELECT * FROM Safaris WHERE category = ?', [category]);
        res.json(classicSafaris);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('*', (_request, response) => {
    response.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
// Endpoint for posting order
app.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from post request
        const { email, lastName, name, phone, totalCost, products } = req.body;
        // Add new order to database
        const result = yield database.run(`
            INSERT INTO orders (email, last_name, name, phone, total_cost)
            VALUES (?, ?, ?, ?, ?)
        `, [email, lastName, name, phone, totalCost]);
        // Get the latest orderid
        const orderId = result.lastID;
        // Add products to the order details table
        for (const product of products) {
            yield database.run(`
                INSERT INTO order_details (order_id, product_name, quantity, start_date )
                VALUES (?, ?, ?, ?)
            `, [orderId, product.name, product.quantity, product.date]);
        }
        res.status(201).json({
            message: 'Order created successfully',
            orderId
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});
