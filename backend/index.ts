import { Request, Response } from 'express';

const express = require('express'),
  path = require('path')

const app = express()

app.get('/api', (_request: Request, response: Response) => {
  response.send({ hello: 'World' })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});


