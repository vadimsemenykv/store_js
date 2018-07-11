import express from 'express';
import NamedRouter from 'express-named-router-url-generator';
import CatalogController from '../../controllers/api/CatalogController';

let Router = NamedRouter(express);

Router.post('/api/catalog/orders', CatalogController.create, { name: 'api:catalog:orders' });

export default Router.expressRouter;
