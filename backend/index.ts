import { Request, Response } from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import cors from 'cors';

const bodyParser = require('body-parser');
const express = require('express'),
  path = require('path')


  let database: Database;

  (async () => {
      database = await sqlite.open({
          driver: sqlite3.Database,
          filename: 'data.sqlite'
      });

      await database.run('PRAGMA foreign_keys = ON');

      console.log('Redo att göra databasanrop');
  })();

const app = express()

app.use(express.static(path.join(path.resolve(), 'dist')))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (_request: Request, response: Response) => {
  response.send({ hello: 'World' })
})

// Endpoint for all safaris
app.get('/safaris', async (_req: Request, res: Response) => {
    try {
        const safaris = await database.all('SELECT * FROM Safaris');
        res.json(safaris);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for one safari
app.get('/safaris/:safariId', async (req: Request, res: Response) => {
    const id = req.params.safariId
    try {
        const safari = await database.all('SELECT * FROM Safaris WHERE id = ?', [id]);
        res.json(safari);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('*', (_request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});
