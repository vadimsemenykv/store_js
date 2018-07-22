/** Common */
import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';
import {urlFor} from 'express-named-router-url-generator';
import { Provider } from 'react-redux';
import { configureAccountStore } from '../../front/store/configureStore';
import { getLinks as getHeaderLinks } from '../infrastructure/url/HeaderLinks';

/** Validators */

/** Models */
import OrderDao from '../dao/Order';
import ContractDao from '../dao/Contract';
import OfferDao from '../dao/Offer';

/** Containers */
import AccountStatusAndNotifications from '../../front/containers/account/AccountStatusAndNotifications';
import MyAccount from '../../front/containers/account/MyAccount';
import MyOrders from '../../front/containers/account/MyOrders';
import MyContracts from '../../front/containers/account/MyContracts';
import MyOffers from '../../front/containers/account/MyOffers';

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
    const buyOrders = OrderDao.find({owner: req.user._id, status: 'active', _type: 'buy'}).populate('categoryCollection').populate('currency');
    const sellOrders = OrderDao.find({owner: req.user._id, status: 'active', _type: 'sell'}).populate('categoryCollection').populate('currency');
    const deactivatedOrders = OrderDao.find({owner: req.user._id, status: 'deactivated'}).populate('categoryCollection').populate('currency');

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        listOrders: {
            list: [...(await buyOrders), ...(await sellOrders), ...(await deactivatedOrders)]
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

AccountController.myContracts = async (req, res) => {
    const linksState = getHeaderLinks(req.user._id);

    const merchantContracts = ContractDao.find({merchant: req.user._id}).populate('order').populate({
        path: 'order',
        populate: {path: 'currency'}
    }).populate({
        path: 'order',
        populate: {path: 'categoryCollection'}
    });
    const clientContracts = ContractDao.find({client: req.user._id}).populate('order').populate({
        path: 'order',
        populate: {path: 'currency'}
    }).populate({
        path: 'order',
        populate: {path: 'categoryCollection'}
    });

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        listContracts: {
            list: [...(await merchantContracts), ...(await clientContracts)]
        }
    };

    const store = configureAccountStore(preloadedState);
    const html = renderToString(
        <Provider store={store} >
            <MyContracts />
        </Provider>
    );
    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'My Contracts',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/my-contracts.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/my-contracts.js"></script>'
                ]
            },
            finalState
        )
    );
};

AccountController.myOffers = async (req, res) => {
    const linksState = getHeaderLinks(req.user._id);
    let expiredFrom = new Date();
    expiredFrom.setDate(expiredFrom.getDate() - 1);

    // const receivedOffers = OfferDao.find({merchant: req.user._id, createdAt: {$gte: expiredFrom}}).populate('order').populate('order.currency').populate({
    const receivedOffers = OfferDao.find({merchant: req.user._id, status: 'active'}).populate('order').populate('order.currency').populate({
        path: 'order',
        populate: {path: 'currency'}
    }).populate({
        path: 'order',
        populate: {path: 'categoryCollection'}
    });
    const sentOffers = OfferDao.find({client: req.user._id, status: 'active'}).populate('order').populate({
        path: 'order',
        populate: {path: 'currency'}
    }).populate({
        path: 'order',
        populate: {path: 'categoryCollection'}
    });
    const declinedExpiredOffers = OfferDao.find({client: req.user._id, status: {$ne: 'active'}}).populate('order').populate({
        path: 'order',
        populate: {path: 'currency'}
    }).populate({
        path: 'order',
        populate: {path: 'categoryCollection'}
    });

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        listOffers: {
            list: [...(await receivedOffers), ...(await sentOffers), ...(await declinedExpiredOffers)]
        }
    };

    const store = configureAccountStore(preloadedState);
    const html = renderToString(
        <Provider store={store} >
            <MyOffers />
        </Provider>
    );
    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'My Offers',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/my-offers.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/my-offers.js"></script>'
                ]
            },
            finalState
        )
    );
};
