/* eslint-disable no-console */
import 'regenerator-runtime/runtime';
import path from 'path';
import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import session from 'express-session';
import RedisStore from 'connect-redis';

import Secure from './infrastructure/auth/Secure';

/** Routers */
import MainRouter from './routes/Main';
import AuthRouter from './routes/Auth';
import AccountRouter from './routes/Account';
import CatalogRouter from './routes/Catalog';
import PageRouter from './routes/Page';

import ApiUserRouter from './routes/api/User';
import ApiOrderRouter from './routes/api/Catalog';

import ApiV1OrderRouter from './routes/api/v1/Order';
import ApiV1OfferRouter from './routes/api/v1/Offer';
import ApiV1ContractRouter from './routes/api/v1/Contract';

import Mongoose from 'mongoose';
import DB from './db';
import UserDao from './dao/User';

const app = express();
const assets = express.static(path.join(__dirname, '../'));

const mongoDbUrl = process.env.MONGO_DB_URL;
const redisUrl = process.env.REDIS_SESSION_URL;
const redisPort = process.env.REDIS_SESSION_PORT;
const sessionSecret = process.env.SESSION_SECRET;

DB.connect(mongoDbUrl, function (err) {
    if (err) {
        console.log(`Unable to connect to Mongo to ${mongoDbUrl}.`);
        console.log(err);
        process.exit(1);
    }
});
process.on('SIGINT', function () {
    DB.close(function (err) {
        if (err) {
            console.log('Unable to close Mongo connection.');
        }
    });
});

app.disable('x-powered-by');
app.use(cors());
// app.options('*', cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(assets);

let redisStore = RedisStore(session);
app.use(session({
    secret: sessionSecret,
    store: new redisStore({ host: redisUrl, port: redisPort }),
    saveUninitialized: false,
    resave: false,
    name: 'NGS_SID'
    // cookie: { domain: "grain.dev" }
}));

app.use((req, res, next) => {
    if (!req.session.userId) {
        req.session.userId = null;
    }
    next();
});
app.use((req, res, next) => {
    UserDao.findOne({_id: req.session.userId}, function (err, user) {
        if (err) {
            // console.log(err);
            res.status(500).send({
                success: false,
                error: err.toString()
            });
            return;
        }

        if (user) {
            req.user = user;
        }
        next();
    });
});
app.use(Secure);

// Front Routes
app.use('/', MainRouter);
app.use('/', AuthRouter);
app.use('/', AccountRouter);
app.use('/', CatalogRouter);
app.use('/', PageRouter);

// API Routes
app.use('/', ApiUserRouter);
app.use('/', ApiOrderRouter);

app.use('api/v1/orders', ApiV1OrderRouter);
app.use('api/v1/offers', ApiV1OfferRouter);
app.use('api/v1/contracts', ApiV1ContractRouter);

Mongoose.Promise = Promise;

export default app;
