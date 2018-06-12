import RouteParser from 'route-parser';
import {urlFor} from "express-named-router-url-generator";

const requiresLogin = [
    '/account/:id/status-and-notifications'
];
const requiresLoggedOut = [
    '/login',
    '/registration'
];

export default function match(req, res, next) {
    const url = req.url;
    requiresLogin.forEach(function (value) {
        const route = new RouteParser(value);
        if (route.match(url)) {
            if (req.session && req.session.userId) {
                return;
            }
            res.redirect(urlFor('login'));
        }
    });
    requiresLoggedOut.forEach(function (value) {
        const route = new RouteParser(value);
        if (route.match(url)) {
            if (!req.session || !req.session.userId) {
                return;
            }
            res.redirect(urlFor('account:statusAndNotifications', {id: req.session.userId}));
        }
    });
    next();
}

