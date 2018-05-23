import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';

import Landing from '../../front/components/Landing';
import Login from '../../front/components/Login';

export default class MainController {}

MainController.index = (req, res) => {
    const html = renderToString(
        <Landing />
    );

    res.status(200).send(renderFullPage({
        title: 'Main',
        html: html,
        cssTop: [
            '<link rel="stylesheet" href="/assets/landing.css"/>'
        ],
        jsBottom: [
            '<script src="/assets/landing.js"></script>'
        ]
    }, {}));
};

MainController.login = (req, res) => {
    const html = renderToString(
        <Login />
    );

    res.status(200).send(renderFullPage({
        title: 'Login',
        html: html,
        cssTop: [
            '<link rel="stylesheet" href="/assets/login.css"/>'
        ],
        jsBottom: [
            '<script src="/assets/login.js"></script>'
        ]
    }, {}));
};

MainController.register = (req, res) => {
    res.status(200).send('NOT IMPLEMENTED:');
};