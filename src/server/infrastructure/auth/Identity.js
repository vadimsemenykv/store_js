import {urlFor} from "express-named-router-url-generator";

export function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect(urlFor('login'))
    }
}

export function requiresLogedOut(req, res, next) {
    if (req.session && req.session.userId) {
        const err = new Error('You must be not logged in to view this page.');
        err.status = 401;
        return next(err);
    } else {
        return next();
    }
}