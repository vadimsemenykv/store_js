import React from 'react';
import { hydrate } from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configureLoginStore'

import Login from './containers/Login';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureStore(state);

hydrate(
    <Provider store={store} >
        <Login />
    </Provider>,
    document.getElementById('root')
);