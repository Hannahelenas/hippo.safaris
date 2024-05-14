"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express'), path = require('path');
const app = express();
app.get('/api', (_request, response) => {
    response.send({ hello: 'World' });
});
app.use(express.static(path.join(path.resolve(), 'dist')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});
