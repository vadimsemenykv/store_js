import express from 'express';
import NamedRouter from 'express-named-router-url-generator';
import CatalogController from '../../controllers/api/CatalogController';

let Router = NamedRouter(express);

Router.post('/api/catalog/orders/create', CatalogController.orderCreate, { name: 'api:catalog:orders:create' });
Router.post('/api/catalog/orders/update-status', CatalogController.orderUpdateStatus, { name: 'api:catalog:orders:updateStatus' });
Router.post('/api/catalog/orders/update', CatalogController.orderUpdate, { name: 'api:catalog:orders:update' });

Router.post('/api/catalog/contracts/reserve', CatalogController.contractReserveOrder, { name: 'api:catalog:contracts:reserve' });
Router.post('/api/catalog/contracts/create', CatalogController.contractCreateFromOrder, { name: 'api:catalog:contracts:create' });

Router.post('/api/catalog/offers/create', CatalogController.createOffer, { name: 'api:catalog:offer:create' });
Router.post('/api/catalog/offers/accept', CatalogController.acceptOffer, { name: 'api:catalog:offer:accept' });
Router.post('/api/catalog/offers/decline', CatalogController.declineOffer, { name: 'api:catalog:offer:decline' });

export default Router.expressRouter;
