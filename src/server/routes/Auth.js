import express from 'express';
import AuthController from '../controllers/AuthController';
import NamedRouter from 'express-named-router-url-generator';

let Router = NamedRouter(express);

Router.get('/login', AuthController.login, { name: "login"});
Router.get('/registration', AuthController.registration, { name: "registration"});

export default Router.expressRouter;