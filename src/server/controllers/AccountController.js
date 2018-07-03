/** Common */
import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';
import {urlFor} from 'express-named-router-url-generator';
import passwordHash from 'password-hash';

/** Validators */
import RegistrationFormValidator from './../../front/validation/registrationFormRules'

/** Models */
import UserDao from '../dao/User';


import { Provider } from 'react-redux'

import { getLinks as getHeaderLinks } from '../infrastructure/url/HeaderLinks';

import AccountStatusAndNotifications from '../../front/containers/AccountStatusAndNotifications';
import MyAccount from '../../front/containers/MyAccount';
import { configureAccountStore } from "../../front/store/configureStore";

export default class AccountController {}

AccountController.statusAndNotifications = (req, res) => {
    const linksState = getHeaderLinks();

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer
    };

    const store = configureAccountStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <AccountStatusAndNotifications />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'Account - Status & Notifications',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/account-status-and-notifications.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/account-status-and-notifications.js"></script>'
                ]
            },
            finalState
        )
    );
};

AccountController.myAccount  = (req, res) => {
    if (!req.user) {
        res.redirect(urlFor('main'));
    }

    const linksState = getHeaderLinks(req.user._id);
    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        extraLinks: { submitUrl: urlFor('api:user') }
    };

    const store = configureAccountStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <MyAccount />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'My account',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/my-account.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/my-account.js"></script>'
                ]
            },
            finalState
        )
    );
};



// };
//
// AuthController.loginSubmit = (req, res) => {
//     UserDao.findOne({ email: req.body.email })
//         .catch(err => console.log(err))
//         .then(user => {
//             if (!user || !passwordHash.verify(req.body.password, user.password)) {
//                 res.status(200).send({success: false, validationErrors: 'Incorrect username or password.' });
//             }
//
//             req.session.userId = user._id;
//             res.status(200).send({success: true, redirect: urlFor('main')});
//         })
// };
//
// AuthController.registration = (req, res) => {
//     const linksState = getHeaderLinks();
//
//     let preloadedState = {
//         header: linksState.header,
//         footer: linksState.footer,
//         extraLinks: { loginUrl: getLoginUrl(), registrationUrl: getRegistrationUrl() }
//     };
//
//     const store = configureRegistrationStore(preloadedState);
//
//     const html = renderToString(<Provider store={store} ><Registration /></Provider>);
//
//     const finalState = store.getState();
//
//     res.status(200).send(
//         renderFullPage(
//             {
//                 title: 'Registration',
//                 html: html,
//                 cssTop: [
//                     '<link rel="stylesheet" href="/assets/registration.css"/>'
//                 ],
//                 jsBottom: [
//                     '<script src="/assets/registration.js"></script>'
//                 ]
//             },
//             finalState
//         )
//     );
// };
//
// AuthController.registrationSubmit = (req, res) => {
//     // validate input
//     const errors = RegistrationFormValidator.run({
//         firstName: req.body.firstName,
//         email: req.body.email,
//         password: req.body.password,
//     });
//
//     if (Object.getOwnPropertyNames(errors).length > 0) {
//         res.status(200).send({success: false, validationErrors: errors});
//         return;
//     }
//
//     UserDao.findOne({email: req.body.email}, function(err, results) {
//         if (err){
//             // console.log(err);
//             res.status(500).send({
//                 success: false,
//                 error: err
//             });
//             return;
//         }
//
//         if (results) {
//             errors.email = ['User with such email already registered'];
//             res.status(200).send({success: false, validationErrors: errors});
//             return;
//         }
//
//         UserDao.create(
//             {
//                 firstName: req.body.firstName,
//                 email: req.body.email,
//                 password: passwordHash.generate(req.body.password, {algorithm:'md5'})
//
//             }, function (err, small) {
//                 if (err) {
//                     res.status(500).send({
//                         success: false,
//                         error: err
//                     });
//                     return console.log(err);
//                 }
//                 req.session.userId = small._id;
//                 res.status(200).send({success: true, id: small._id, redirect: urlFor('main')});
//             }
//         );
//     });
// };
//
// AuthController.logout = (req, res, next) => {
//     if (req.session) {
//         // delete session object
//         req.session.destroy(function(err) {
//             if(err) {
//                 return next(err);
//             } else {
//                 return res.redirect('/');
//             }
//         });
//     }
// };