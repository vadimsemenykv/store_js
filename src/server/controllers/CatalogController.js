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
import { configureCatalogStore } from "../../front/store/configureStore";
import Catalog from "../../front/containers/Catalog";

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