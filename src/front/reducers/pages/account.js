import { combineReducers } from 'redux';
import header from '../header';
import footer from '../footer';
import user from '../user';
import extraLinks from '../extraLinks';
import listOrders from '../listOrders';
import listContracts from '../listContracts';
import listOffers from '../listOffers';
import auditModal from '../auditModal';

export default combineReducers({
    header,
    footer,
    user,
    extraLinks,
    listOrders,
    listContracts,
    listOffers,
    auditModal
});
