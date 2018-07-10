import React from 'react';
import { hydrate } from 'react-dom';
import {Provider} from 'react-redux';
import { configureCatalogStore } from './store/configureStore';

import CatalogOrdersCreate from './containers/catalog/CatalogOrdersCreate';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureCatalogStore(state);

hydrate(
    <Provider store={store} >
        <CatalogOrdersCreate />
    </Provider>,
    document.getElementById('root')
);
