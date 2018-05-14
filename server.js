'use strict';


const PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`${HOST}:${PORT}`);
});
app.get('/ads', (req, res) => {
    res.send(`${HOST}:${PORT}`);
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

process.on('SIGINT', function() {
    console.log(`graceful shutdown`);
});