import path from 'path';
import express from 'express';
import cors from 'cors';

import MainRouter from './routes/Main';
import AuthRouter from './routes/Auth';
import PageRouter from './routes/Page';

const app = express();
const assets = express.static(path.join(__dirname, '../'));

app.disable('x-powered-by');
app.use(cors());
app.use(assets);

// Routes
app.use('/', MainRouter);
app.use('/', AuthRouter);
app.use('/', PageRouter);

process.on('SIGINT', function() {
    console.log(`graceful shutdown!!!!!!!!!!!!`);
});

export default app;