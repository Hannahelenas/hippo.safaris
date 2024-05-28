import { Request, Response } from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';

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

let database: Database;

(async () => {
    database = await sqlite.open({
        driver: sqlite3.Database,
        filename: 'data.sqlite'
    });

    await database.run('PRAGMA foreign_keys = ON');
    console.log('Redo att göra databasanrop');
})();

const app = express();

app.use(express.static(path.join(path.resolve(), 'dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (_request: Request, response: Response) => {
    response.send({ hello: 'World' });
});

// Endpoint for all safaris
app.get('/safaris', async (_req: Request, res: Response) => {
    try {
        const safaris: Safari[] = await database.all('SELECT * FROM Safaris');
        res.json(safaris);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for one safari
app.get('/safaris/:safariId', async (req: Request, res: Response) => {
    const id: string = req.params.safariId;
    try {
        const safari: Safari[] = await database.all(
            'SELECT * FROM Safaris WHERE id = ?',
            [id]
        );
        res.json(safari);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Endpoint for classic safaris
 app.get('/classic', async (_req: Request, res: Response) => {
    const category: string = 'Classic'
    try {
        const classicSafaris: Safari[] = await database.all('SELECT * FROM Safaris WHERE category = ?', [category]);
        res.json(classicSafaris)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('*', (_request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Endpoint for posting order
app.post('/orders', async (req: Request, res: Response) => {
    try {
        // Extract data from post request
        const { email, lastName, name, phone, totalCost, products }: Order =
            req.body;

        // Add new order to database
        const result = await database.run(
            `
            INSERT INTO orders (email, last_name, name, phone, total_cost)
            VALUES (?, ?, ?, ?, ?)
        `,
            [email, lastName, name, phone, totalCost]
        );

        // Get the latest orderid
        const orderId = result.lastID;

        // Add products to the order details table
        for (const product of products) {
            await database.run(
                `
                INSERT INTO order_details (order_id, product_name, quantity, start_date )
                VALUES (?, ?, ?, ?)
            `,
                [orderId, product.name, product.quantity, product.date]
            );
        }

        res.status(201).json({
            message: 'Order created successfully',
            orderId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});
