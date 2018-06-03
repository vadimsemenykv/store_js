import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';
import { Provider } from 'react-redux'
import configureLandingStore from '../../front/store/configureLandingStore'
import { getLinks as getHeaderLinks } from "../infrastructure/url/HeaderLinks";

import Landing from '../../front/containers/Landing';

/** Models */
import UserModel from '../model/User';

export default class MainController {}

MainController.index = (req, res) => {
    const linksState = getHeaderLinks(req.session.userId);

    let preloadedState = {
        header: linksState.header,
        footer: linksState.footer,
    };

    if (req.session.userId) {
        UserModel.findOne({_id: req.session.userId}, function (err, user) {
            return;
            if (err){
                // console.log(err);
                res.status(500).send({
                    success: false,
                    error: err
                });
                return;
            }

            if (user) {
                preloadedState.user = user;
            }
        });
    }

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
