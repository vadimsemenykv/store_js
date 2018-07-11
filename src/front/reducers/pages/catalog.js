import { combineReducers } from 'redux';
import header from '../header';
import footer from '../footer';
import user from '../user';
import extraLinks from '../extraLinks';
import currencies from '../currencies';
import collections from '../collections';
import listOrders from '../listOrders';
import order from '../order';

export default combineReducers({
    header,
    footer,
    user,
    extraLinks,
    collections,
    currencies,
    listOrders,
    order
});
