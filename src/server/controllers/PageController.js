import React from 'react';
import { renderToString } from 'react-dom/server';
import renderFullPage from './renderFullPage';

import { Provider } from 'react-redux'
import configureStore from '../../front/store/configureLoginStore'

import Landing from '../../front/containers/Landing';
import Login from '../../front/containers/Login';

export default class PageController {}

PageController.index = (req, res) => {
    res.status(200).send('NOT IMPLEMENTED:');
};