import path from 'path';
import express from 'express';
import cors from 'cors';

import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './controllers/renderFullPage';

import Landing from '../front/components/Landing';

const app = express();
const assets = express.static(path.join(__dirname, '../'));

app.use(cors());
app.use(assets);

app.get('/', (req, res) => {
    const html = renderToString(
        <Landing />
    );
    // res.render('landing', { title: 'Hey', htmlContent: 2, preloadedState: {da: 1} });
    res.status(200).send(renderFullPage({
        title: 'Main',
        html: html,
        jsBottom: ['<script src="/assets/landing.js"></script>']
    }, {}));

});

// app.get('*', router);

process.on('SIGINT', function() {
    console.log(`graceful shutdown!!!!!!!!!!!!`);
});

export default app;