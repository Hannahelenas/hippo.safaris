import { Request, Response } from 'express';

const express = require('express'),
  path = require('path')

const app = express()

app.use(express.static(path.join(path.resolve(), 'dist')))

app.get('/api', (_request: Request, response: Response) => {
  response.send({ hello: 'World' })
})

app.get('*', (_request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});
