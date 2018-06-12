import express from 'express';
import AccountController from '../controllers/AccountController';
import NamedRouter from 'express-named-router-url-generator';

let Router = NamedRouter(express);

Router.get(
    '/account/:id/status-and-notifications',
    AccountController.statusAndNotifications,
    { name: "account:statusAndNotifications", where: { id:  NamedRouter.ALPHA_NUMBER } }
);

export default Router.expressRouter;