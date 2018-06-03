import path from 'path';
import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import session from 'express-session';
import RedisStore from 'connect-redis'

import MainRouter from './routes/Main';
import AuthRouter from './routes/Auth';
import PageRouter from './routes/Page';
import DB from "./db";

const app = express();
const assets = express.static(path.join(__dirname, '../'));

const mongo_db_url = process.env.MONGO_DB_URL;
const redis_url = process.env.REDIS_SESSION_URL;
const redis_port = process.env.REDIS_SESSION_PORT;
const session_secret = process.env.SESSION_SECRET;

DB.connect(mongo_db_url, function (err) {
    if (err) {
        console.log(`Unable to connect to Mongo to ${mongo_db_url}.`);
        console.log(err);
        process.exit(1)
    }
});

app.disable('x-powered-by');
app.use(cors());
// app.options('*', cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(assets);

let redisStore = RedisStore(session);
app.use(session({
    secret: session_secret,
    store: new redisStore({ host: redis_url, port: redis_port }),
    saveUninitialized: false,
    resave: false,
    name: "NGS_SID",
    // cookie: { domain: "grain.dev" }
}));

app.use((req, res, next) => {
    if (!req.session.userId) {
        req.session.userId = null;
    }
    next();
});

// Routes
app.use('/', MainRouter);
app.use('/', AuthRouter);
app.use('/', PageRouter);

export default app;