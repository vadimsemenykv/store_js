import express from 'express';
import MainController from '../controllers/MainController'

let Router = express.Router();

Router.get('/', MainController.index);
Router.get('/login', MainController.login);
Router.get('/register', MainController.register);

export default Router;