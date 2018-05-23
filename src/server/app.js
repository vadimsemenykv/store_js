import path from 'path';
import express from 'express';
import cors from 'cors';

import MainRouter from './routes/Main';

const app = express();
const assets = express.static(path.join(__dirname, '../'));

app.use(cors());
app.use(assets);

// Routes
app.use('/', MainRouter);

process.on('SIGINT', function() {
    console.log(`graceful shutdown!!!!!!!!!!!!`);
});

export default app;