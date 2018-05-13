'use strict';

const express = require('express');

// Constants
const PORT = 10080;
const HOST = 'app';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});
app.get('/ads', (req, res) => {
    res.send('ads\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);