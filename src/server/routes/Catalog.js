import express from 'express';
import NamedRouter from 'express-named-router-url-generator';
import CatalogController from '../controllers/CatalogController';

let Router = NamedRouter(express);

Router.get('/catalog', CatalogController.main, { name: 'catalog:main' });
Router.get('/catalog/orders/create', CatalogController.createOrder, { name: 'catalog:orders:create' });
Router.get('/catalog/contracts/create/:orderId', CatalogController.createContract, { name: 'catalog:contracts:create' });

export default Router.expressRouter;
