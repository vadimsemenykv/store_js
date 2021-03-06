import React from 'react';
import { hydrate } from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configureLandingStore'

import Landing from './containers/Landing';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureStore(state);

hydrate(
    <Provider store={store} >
        <Landing />
    </Provider>,
    document.getElementById('root')
);