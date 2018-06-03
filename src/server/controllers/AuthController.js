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

import { getLinks as getHeaderLinks, getRegistrationUrl, getLoginUrl} from '../infrastructure/url/HeaderLinks';

import Login from '../../front/containers/Login';
import Registration from '../../front/containers/Registration';

export default class AuthController {}

AuthController.login = (req, res) => {
    const linksState = getHeaderLinks();

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
    const linksState = getHeaderLinks();

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        extraLinks: { loginUrl: getLoginUrl(), registrationUrl: getRegistrationUrl() }
    };

    const store = configureRegistrationStore(preloadedState);

    const html = renderToString(<Provider store={store} ><Registration /></Provider>);

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

    if (Object.getOwnPropertyNames(errors).length > 0) {
        res.status(200).send({success: false, validationErrors: errors});
        return;
    }

    UserModel.findOne({email: req.body.email}, function(err, results) {
        if (err){
            // console.log(err);
            res.status(500).send({
                success: false,
                error: err
            });
            return;
        }

        if (results) {
            errors.email = ['User with such email already registered'];
            res.status(200).send({success: false, validationErrors: errors});
            return;
        }

        UserModel.create(
            {
                firstName: req.body.firstName,
                email: req.body.email,
                password: passwordHash.generate(req.body.password, {algorithm:'md5'})

            }, function (err, small) {
                if (err) {
                    res.status(500).send({
                        success: false,
                        error: err
                    });
                    return console.log(err);
                }
                req.session.userId = small._id;
                res.status(200).send({success: true, id: small._id, redirect: urlFor('main')});
            }
        );
    });
};

AuthController.logout = (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
};