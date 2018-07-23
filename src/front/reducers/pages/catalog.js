import { combineReducers } from 'redux';
import location from '../location';
import header from '../header';
import footer from '../footer';
import user from '../user';
import extraLinks from '../extraLinks';
import currencies from '../currencies';
import collections from '../collections';
import listOrders from '../listOrders';
import order from '../order';
import offer from '../offer';

export default combineReducers({
    location,
    header,
    footer,
    user,
    extraLinks,
    collections,
    currencies,
    listOrders,
    order,
    offer
});
