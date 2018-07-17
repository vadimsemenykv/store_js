import React from 'react';
import { hydrate } from 'react-dom';
import {Provider} from 'react-redux';
import { configureAccountStore } from './store/configureStore';

import MyOffers from './containers/account/MyOffers';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureAccountStore(state);

hydrate(
    <Provider store={store} >
        <MyOffers />
    </Provider>,
    document.getElementById('root')
);
