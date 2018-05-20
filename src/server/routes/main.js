import express from 'express';
import MainController from '../controllers/MainController'

let Router = express.Router();

Router.get('/', MainController.index);