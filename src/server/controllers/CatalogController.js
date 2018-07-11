/** Common */
import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';
import { Provider } from 'react-redux';
import {urlFor} from 'express-named-router-url-generator';
import { getLinks as getHeaderLinks } from '../infrastructure/url/HeaderLinks';
import { configureCatalogStore } from '../../front/store/configureStore';

/** Validators */
// import RegistrationFormValidator from './../../front/validation/registrationFormRules';

/** Containers */
import Catalog from '../../front/containers/catalog/Catalog';
import CatalogOrdersCreate from '../../front/containers/catalog/CatalogOrdersCreate';
import CatalogContractsCreate from '../../front/containers/catalog/CatalogContractsCreate';

/** Models */
import OrderDao from '../dao/Order';
import CollectionDao from '../dao/Collection';
import CurrencyDao from '../dao/Currency';


const getCollections = () => CollectionDao.find({});
const getCurrencies = () => CurrencyDao.find({});

export default class CatalogController {}

CatalogController.main = async (req, res) => {
    const linksState = getHeaderLinks(req.user._id);
    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        collections: await getCollections(),
        currencies: await getCurrencies(),
        extraLinks: { submitUrl: urlFor('api:user') },
        listOrders: await OrderDao.find({status: 'active'}).populate('categoryCollection').populate('currency')
    };

    const store = configureCatalogStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <Catalog />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'OTC Order Book',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/catalog.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/catalog.js"></script>'
                ]
            },
            finalState
        )
    );
};

CatalogController.createOrder = async (req, res) => {
    const linksState = getHeaderLinks(req.user._id);
    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        collections: await getCollections(),
        currencies: await getCurrencies(),
        extraLinks: { submitUrl: urlFor('api:user') }
    };

    const store = configureCatalogStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <CatalogOrdersCreate />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'Create New Buy / Sell Order',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/catalog-orders-create.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/catalog-orders-create.js"></script>'
                ]
            },
            finalState
        )
    );
};

CatalogController.createContract = async (req, res) => {
    const linksState = getHeaderLinks(req.user._id);
    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        collections: await getCollections(),
        currencies: await getCurrencies(),
        extraLinks: { submitUrl: urlFor('api:user') },
        order: await OrderDao.findById(req.params.orderId).populate('categoryCollection').populate('currency')
    };

    const store = configureCatalogStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <CatalogContractsCreate />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'Create New Contract',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/catalog-contracts-create.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/catalog-contracts-create.js"></script>'
                ]
            },
            finalState
        )
    );
};
