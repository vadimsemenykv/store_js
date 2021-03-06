import express from 'express';
import AuthController from '../controllers/AuthController';
import NamedRouter from 'express-named-router-url-generator';

let Router = NamedRouter(express);

Router.get('/login', AuthController.login, { name: "login"});
Router.post('/login', AuthController.loginSubmit);

Router.get('/registration', AuthController.registration, { name: "registration"});
Router.post('/registration', AuthController.registrationSubmit);

Router.get('/logout', AuthController.logout, { name: "logout"});

export default Router.expressRouter;