import React from 'react';
import { hydrate } from 'react-dom';
import {Provider} from 'react-redux';
import { configureCatalogStore } from './store/configureStore';
import CatalogOffersAccept from './containers/catalog/CatalogOffersAccept';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureCatalogStore(state);

hydrate(
    <Provider store={store} >
        <CatalogOffersAccept />
    </Provider>,
    document.getElementById('root')
);
