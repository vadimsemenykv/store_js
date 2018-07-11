import express from 'express';
import NamedRouter from 'express-named-router-url-generator';
import CatalogController from '../../controllers/api/CatalogController';

let Router = NamedRouter(express);

Router.post('/api/catalog/orders/create', CatalogController.create, { name: 'api:catalog:orders:create' });
Router.post('/api/catalog/orders/change-status', CatalogController.orderChangeStatus, { name: 'api:catalog:orders:changeStatus' });

Router.post('/api/catalog/contracts/reserve', CatalogController.reserveOrder, { name: 'api:catalog:contracts:reserve' });
Router.post('/api/catalog/contracts/create', CatalogController.createContract, { name: 'api:catalog:contracts:create' });

Router.post('/api/catalog/offers/create', CatalogController.createOffer, { name: 'api:catalog:offer:create' });
Router.post('/api/catalog/offers/accept', CatalogController.acceptOffer, { name: 'api:catalog:offer:accept' });

export default Router.expressRouter;
