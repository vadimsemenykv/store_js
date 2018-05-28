import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';
import { Provider } from 'react-redux'
import configureLandingStore from '../../front/store/configureLandingStore'
import getLinksState from '../state/Links';

import Landing from '../../front/containers/Landing';

export default class MainController {}

MainController.index = (req, res) => {
    const linksState = getLinksState();

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
    };

    const store = configureLandingStore(preloadedState);

    const html = renderToString(
        <Provider store={store} >
            <Landing />
        </Provider>
    );

    const finalState = store.getState();

    res.status(200).send(
        renderFullPage(
            {
                title: 'Main',
                html: html,
                cssTop: [
                    '<link rel="stylesheet" href="/assets/landing.css"/>'
                ],
                jsBottom: [
                    '<script src="/assets/landing.js"></script>'
                ]
            },
            finalState
        )
    );
};
