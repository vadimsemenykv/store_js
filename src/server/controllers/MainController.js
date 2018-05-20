import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';

import Landing from '../../front/components/Landing';

exports.index = (req, res) => {
    const html = renderToString(
        <Landing />
    );

    res.status(200).send(renderFullPage({
        title: 'Main',
        html: html,
        jsBottom: [
            '<script src="/assets/landing.js"></script>'
        ]
    }, {}));
};

exports.login = (req, res) => {
    res.status(200).send('Login');
};

exports.register = (req, res) => {
    res.status(200).send('NOT IMPLEMENTED:');
};