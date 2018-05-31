import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';
import {urlFor} from 'express-named-router-url-generator';
import passwordHash from 'password-hash';

/** Validators */
import RegistrationFormValidator from './../../front/validation/registrationFormRules'

/** Models */
import UserModel from '../model/User';


import { Provider } from 'react-redux'
import configureLoginStore from '../../front/store/configureLoginStore'
import configureRegistrationStore from '../../front/store/configureRegistrationStore'

import getLinksState from '../state/Links';

import Login from '../../front/containers/Login';
import Registration from '../../front/containers/Registration';

export default class AuthController {}

AuthController.login = (req, res) => {
    const linksState = getLinksState();

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        extraLinks: { registrationUrl: linksState.registrationUrl }
    };

    const store = configureLoginStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <Login />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'Login',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/login.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/login.js"></script>'
                ]
            },
            finalState
        )
    );
};

AuthController.registration = (req, res) => {
    const linksState = getLinksState();

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        extraLinks: { loginUrl: linksState.loginUrl }
    };

    const store = configureRegistrationStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <Registration />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'Registration',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/registration.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/registration.js"></script>'
                ]
            },
            finalState
        )
    );
};

AuthController.registrationSubmit = (req, res) => {
    // validate input
    const errors = RegistrationFormValidator.run({
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
    });

    //TODO validate for same email

    if (Object.getOwnPropertyNames(errors).length > 0) {
        res.status(200).send({status:'fail', validationErrors: errors});
        return;
    }

    if (UserModel.findOne({email: req.body.email})) {
        errors.email = ['User with such email already registered'];
        res.status(200).send({status:'fail', validationErrors: errors});
        return;
    }

    UserModel.create(
        {
            firstName: req.body.firstName,
            email: req.body.email,
            password: passwordHash.generate(req.body.password, {algorithm:'md5'})

        }, function (err, small) {if (err) return console.log(err);}
    );

    res.status(200).send({status:'success', redirect: urlFor('main')});
};