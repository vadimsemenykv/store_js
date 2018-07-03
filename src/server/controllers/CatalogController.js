/** Common */
import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';
import { Provider } from 'react-redux'
import {urlFor} from 'express-named-router-url-generator';
import { getLinks as getHeaderLinks } from '../infrastructure/url/HeaderLinks';
import { configureCatalogStore } from "../../front/store/configureStore";

/** Validators */
import RegistrationFormValidator from './../../front/validation/registrationFormRules'

/** Containers */
import Catalog from "../../front/containers/Catalog";
import CatalogCreate from "../../front/containers/CatalogCreate";

/** Models */
import OrderDao from '../dao/Order';

export default class CatalogController {}

CatalogController.main = (req, res) => {
    const linksState = getHeaderLinks(req.user._id);
    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        extraLinks: { submitUrl: urlFor('api:user') }
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

CatalogController.create = (req, res) => {
    const linksState = getHeaderLinks(req.user._id);
    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
        user: req.user,
        extraLinks: { submitUrl: urlFor('api:user') }
    };

    const store = configureCatalogStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <CatalogCreate />
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