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

import AccountStatusAndNotifications from '../../front/containers/account/AccountStatusAndNotifications';
import MyAccount from '../../front/containers/account/MyAccount';
import MyOrders from '../../front/containers/account/MyOrders';
import { configureAccountStore } from "../../front/store/configureStore";
import OrderDao from "../dao/Order";

export default class AccountController {}

AccountController.MyStatusAndNotifications = (req, res) => {
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

AccountController.myAccount = (req, res) => {
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

AccountController.myOrders = async (req, res) => {
    const linksState = getHeaderLinks(req.user._id);
    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        listOrders: {
            buy: await OrderDao.find({owner: req.user._id, status: 'active', _type: 'buy'}).populate('categoryCollection').populate('currency'),
            sell: await OrderDao.find({owner: req.user._id, status: 'active', _type: 'sell'}).populate('categoryCollection').populate('currency'),
            deactivated: await OrderDao.find({owner: req.user._id, status: 'deactivated'}).populate('categoryCollection').populate('currency')
        }
    };

    const store = configureAccountStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <MyOrders />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'My Orders',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/my-orders.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/my-orders.js"></script>'
                ]
            },
            finalState
        )
    );
};
