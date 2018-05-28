import express from 'express';
import MainController from '../controllers/MainController';
import NamedRouter from 'express-named-router-url-generator';

let Router = NamedRouter(express);

Router.get('/', MainController.index, { name: "main"});

export default Router.expressRouter;