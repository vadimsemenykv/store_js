import path from 'path';
import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server'

import Landing from '../front/components/Landing';

const app = express();

const assets = express.static(path.join(__dirname, '../'));
// const indexPath = path.join(__dirname, '../index.html');

app.use(cors());
app.use(assets);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.get('/', (req, res) => {
    res.status(200).send(renderToString(<Landing />));
});
app.get('/2', (req, res) => {
    res.render('main', { title: 'Hey', message: 'Hello there!' })
});

process.on('SIGINT', function() {
    console.log(`graceful shutdown!!!!!!!!!!!!`);
});

export default app;