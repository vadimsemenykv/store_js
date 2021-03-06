import express from 'express';
import AccountController from '../controllers/AccountController';
import NamedRouter from 'express-named-router-url-generator';

let Router = NamedRouter(express);

Router.get('/my/account', AccountController.myAccount, { name: 'account:myAccount' });
Router.get(
    '/my/account/status-and-notifications',
    AccountController.MyStatusAndNotifications,
    { name: 'account:statusAndNotifications' }
);
Router.get('/my/orders', AccountController.myOrders, { name: 'account:myOrders' });
Router.get('/my/contracts', AccountController.myContracts, { name: 'account:myContracts' });
Router.get('/my/offers', AccountController.myOffers, { name: 'account:myOffers' });

export default Router.expressRouter;
