import express from 'express';
import AccountController from '../controllers/AccountController';
import NamedRouter from 'express-named-router-url-generator';

let Router = NamedRouter(express);

Router.get('/my/account', AccountController.myAccount, { name: "account:myAccount" });
Router.get(
    '/my/account/status-and-notifications',
    AccountController.statusAndNotifications,
    { name: "account:statusAndNotifications" }
);

export default Router.expressRouter;